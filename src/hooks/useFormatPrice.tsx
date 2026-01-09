import { useMemo } from "react";
import { useCurrencyContext } from "@/hoc/currency";
import useRates from "./useRates";
import { convertFromUsd, formatMoney } from "@/utils/price";

export default function useFormatPrice(price?: number) {
  const currency = useCurrencyContext();
  const rates = useRates();

  const priceText = useMemo(() => {
    if (price == null) return "";
    const value = rates ? convertFromUsd(price, currency, rates) : price;
    return formatMoney(value, rates ? currency : "USD");
  }, [price, rates, currency]);

  return { priceText, currency };
}
