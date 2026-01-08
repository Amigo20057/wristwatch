import { useCurrencyContext } from "@/hoc/currency";
import useRates from "./useRates";
import { convertFromUsd, formatMoney } from "@/utils/price";

export default function useFormatPrice(price?: number) {
  const currency = useCurrencyContext();
  const rates = useRates();
  if (!price) {
    return {
      priceText: "",
      currency,
    };
  }
  const value = rates ? convertFromUsd(price, currency, rates) : price;
  const priceText = rates ? formatMoney(value, currency) : "0,000";

  return { priceText, currency };
}
