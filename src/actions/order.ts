"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: { include: { watch: true } } };
}>;

export async function getOrder({
  order,
  phoneNumber,
}: {
  order: string;
  phoneNumber: string;
}): Promise<OrderWithItems | null> {
  return prisma.order.findFirst({
    where: {
      orderNumber: order,
      phone: phoneNumber,
    },
    include: {
      items: {
        include: {
          watch: true,
        },
      },
    },
  });
}
