"use server";

import { db } from "@/app/db";
import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { stripe } from "@/lib/Stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("Configuration not found.");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCTS_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCTS_PRICES.material.polycarbonate;

  //before creating an order we need to check is there already an order of this configuration. If there is then we wont create a new one.
  let order: Order | undefined = undefined; // '| undefined = undefined' means we set the default value undefined beside telling it "or undefined"

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        userId: user.id,
        amount: price / 100,
        configurationId: configuration.id,
      },
    });
  }

  // to create the payment session we need to know which product the user is buying
  const product = await stripe.products.create({
    name: "Custom Iphone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  // creating payment session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["DE", "US"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      { price: product.default_price as string, quantity: 1 },
    ],
  });

  return {
    url: stripeSession.url, // this is the provided page by stripe according to the details for the secure transactions. We need to push the URL to the browser.
  };
};
