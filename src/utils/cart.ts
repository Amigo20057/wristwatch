import "server-only";
import { cookies } from "next/headers";
import type { ICart } from "@/types/cart.interface";

export async function getCart(): Promise<ICart | null> {
  const cookieStore = await cookies();
  const c = cookieStore.get("cart")?.value;

  return c ? JSON.parse(c) : null;
}
