"use server";

import { OrderStatus } from "@prisma/client";
import { db } from "../db";

interface props {
  id: string;
  newStatus: OrderStatus;
}

export const changeOrderStatus = async ({ id, newStatus }: props) => {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  });
};
