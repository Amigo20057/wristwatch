"use server";

import prisma from "@/utils/prisma";

export default async function getUserFromDb(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export async function changeUserNameById(
  userId: string,
  name: string,
  surname: string
) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name, surname },
    select: { name: true, surname: true },
  });

  return updated;
}
