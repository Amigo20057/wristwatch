"use server";

import { OrderStatus, Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: { include: { watch: true } } };
}>;

type CreateOrderPayload = {
  userId: string;
  email?: string | null;

  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;

  cardNumber?: string | null;
  expirationDate?: string | null;
  securityCode?: string | null;
  nameOnCard?: string | null;

  items: Array<{ watchId: bigint; quantity: number }>;
};

function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LP-${date}-${rand}`;
}

export async function createOrder(payload: CreateOrderPayload) {
  const orderNumber = generateOrderNumber();

  await prisma.order.create({
    data: {
      userId: payload.userId,
      orderNumber,

      email: payload.email ?? null,

      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload.address,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      phone: payload.phone,

      cardNumber: payload.cardNumber ?? null,
      expirationDate: payload.expirationDate ?? null,
      securityCode: payload.securityCode ?? null,
      nameOnCard: payload.nameOnCard ?? null,

      status: OrderStatus.PENDING,

      items: {
        createMany: {
          data: payload.items.map((i) => ({
            watchId: i.watchId,
            quantity: i.quantity,
          })),
        },
      },
    },
  });
}

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

export async function getOrdersByUserId(
  userId: string
): Promise<OrderWithItems[]> {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { watch: true } } },
    orderBy: { createdAt: "desc" },
  });
}
