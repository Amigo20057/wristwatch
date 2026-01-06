import { getCurrency } from "@/utils/currency";
import HeaderClient from "./header-client";

export default async function Header() {
  const currency = await getCurrency();
  return <HeaderClient initialCurrency={currency} />;
}
