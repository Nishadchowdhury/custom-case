"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "../db";

export const getPaymentStatus = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error("You need to logged in to view the page.");
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      // it's works like sql join.
      BillingAddress: true,
      configuration: true,
      ShippingAddress: true,
      user: true,
      // we're join these tables with the order table
    },
  });

  if (!order) {
    throw new Error("This order is not found.");
  }
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
