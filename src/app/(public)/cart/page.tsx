import { getCart } from "@/utils/cart";
import CartClient from "./cart-client";

export default async function Cart() {
  const cart = await getCart();
  return <CartClient cart={cart!} />;
}
