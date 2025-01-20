import { db } from "@/app/db";
import { stripe } from "@/lib/Stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import OrderReceivedEmail from "../../../components/custom/emails/OrderReceivedEmail";

// resend webhook
const resend = new Resend(process.env.RESEND_API_KEY);

// stripe webhook
export async function POST(req: Request) {
  try {
    const body = await req.text(); // instead of req.body and else we'll take req.text to validate that the req from stripe. Stripe sends a signature in req to validate.

    const signature = headers().get("stripe-signature"); // getting the signature from stripe and if no signature then throw err 400: badReq.

    if (!signature) {
      return new Response("invalid signature", { status: 400 });
    }

    // it's time to verify that the function is been called by stripe.
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    // getting the secret: Goto stripe and search webhooks then go to developer/webhooks and create for the site by provide a dummy url initially and select the api version and active the events this time "checkout.session.completed" then either take the code or do your own.

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing customer email");
      }

      const session = event.data.object as Stripe.Checkout.Session; // this contains all the information that we care as user metadata and the sessions details.

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      // we can not go further it not the user's metadata because stripe must send the metadata
      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }

      // now get the shipping address. What is provided by the user on the payment page.
      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          ShippingAddress: {
            // we need to create because it's might not created yet
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state!,
            },
          },
          BillingAddress: {
            // we need to create because it's might not created yet
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!,
            },
          },
        },
      });

      await resend.emails.send({
        from: "Custom Case <nishadhj111@gmail.com>", // give the email that owns the API key.
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),

          //@ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            street: shippingAddress!.line1!,
            city: shippingAddress!.city!,
            postalCode: shippingAddress!.postal_code!,
            country: shippingAddress!.country!,
            state: shippingAddress!.state!,
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );

    // 9:5:30
    //send this to sentry
  }
}
