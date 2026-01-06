import { getCurrency } from "@/utils/currency";
import { CurrencyProvider } from "./currency";

export default async function CurrencyProviderServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const currency = await getCurrency();

  return <CurrencyProvider currency={currency}>{children}</CurrencyProvider>;
}
