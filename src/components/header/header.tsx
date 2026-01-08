import { getCountry, getCurrency } from "@/utils/currency";
import HeaderClient from "./header-client";

export default async function Header() {
  const currency = await getCurrency();
  const country = await getCountry();
  return <HeaderClient initialCurrency={currency} initialCountry={country} />;
}
