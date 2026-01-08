import { ICart } from "@/types/cart.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cart = (await req.json()) as ICart;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
