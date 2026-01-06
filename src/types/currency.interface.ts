export type Currency = "USD" | "EUR" | "UAH";

export const isCurrency = (v: any): v is Currency =>
  v === "USD" || v === "EUR" || v === "UAH";

export type CountryCode = "US" | "DE" | "UA";

export type CountryOption = {
  code: CountryCode;
  name: string;
  flag: string;
  defaultCurrency: Currency;
  currencies: Currency[];
  currencySymbol: Record<Currency, string>;
};
