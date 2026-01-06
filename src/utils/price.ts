import type { Currency } from "@/types/currency.interface";

export type Rates = {
  USD_UAH: number;
  EUR_UAH: number;
};

export function convertFromUsd(
  priceUsd: number,
  currency: Currency,
  rates: Rates
) {
  if (currency === "USD") return priceUsd;

  const priceUah = priceUsd * rates.USD_UAH;
  if (currency === "UAH") return priceUah;

  return priceUah / rates.EUR_UAH;
}

export function formatMoney(value: number, currency: Currency) {
  const locale =
    currency === "USD" ? "en-US" : currency === "EUR" ? "de-DE" : "uk-UA";

  return new Intl.NumberFormat(locale, {
    currency,
    minimumFractionDigits: 0,
  }).format(value);
}
