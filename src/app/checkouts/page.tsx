import CheckoutClient from "./checkout-client";
import { getCart } from "@/utils/cart";

export default async function Checkouts() {
  const cart = await getCart();
  return <CheckoutClient cart={cart!} />;
}
