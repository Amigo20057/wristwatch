"use server";

import type { IUser } from "@/types/user.interface";
import { signIn, signOut } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { hash } from "argon2";

export async function hashPassword(password: string) {
  return await hash(password);
}

export async function registerUser(data: IUser) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error("User existing");
    }
    data.password = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      },
    });
    return user;
  } catch (error) {
    console.error("Error register user", error);
    return { error: "Error register user" };
  }
}

export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  } catch (error) {
    console.error("Error authorization: ", error);
    throw error;
  }
}

export async function signOutFunc() {
  try {
    const result = await signOut({ redirect: false });
    return result;
  } catch (error) {
    console.error("Error authorization: ", error);
    throw error;
  }
}
