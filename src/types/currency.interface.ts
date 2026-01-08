export type Currency = "USD" | "EUR" | "UAH";

export const isCurrency = (v: Currency): v is Currency =>
  v === "USD" || v === "EUR" || v === "UAH";

export const isCountry = (v: CountryCode): v is CountryCode =>
  v === "US" || v === "DE" || v === "UA";

export type CountryCode = "US" | "DE" | "UA";

export type CountryOption = {
  code: CountryCode;
  name: string;
  flag: string;
  defaultCurrency: Currency;
  currencies: Currency[];
  currencySymbol: Record<Currency, string>;
};

export type Symbols = "$" | "€" | "₴";

export const symbolCurrencies: Record<Currency, Symbols> = {
  EUR: "€",
  USD: "$",
  UAH: "₴",
};
