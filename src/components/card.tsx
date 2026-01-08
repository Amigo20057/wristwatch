import { useCurrencyContext } from "@/hoc/currency";
import useRates from "@/hooks/useRates";
import { symbolCurrencies } from "@/types/currency.interface";
import { IWatch } from "@/types/watch.interface";
import { convertFromUsd, formatMoney } from "@/utils/price";
import Image from "next/image";

interface IProps {
  watch: IWatch;
}

export default function Card({ watch }: IProps) {
  const currency = useCurrencyContext();
  const rates = useRates();

  const value = rates
    ? convertFromUsd(watch.price, currency, rates)
    : watch.price;
  const priceText = rates ? formatMoney(value, currency) : "0,000";

  return (
    <div className="w-[279px] h-[500px] ">
      <div className="bg-[#f0f0f0] h-[400px] relative overflow-hidden cursor-pointer">
        <Image
          src={watch.images[0]}
          alt="watch"
          fill
          priority
          className="
          object-cover
          transition-transform
          duration-500
          ease-out
          hover:scale-105
          "
        />
      </div>
      <p
        className="text-[10px] mt-5 text-gray cursor-pointer hover:underline"
        style={{
          fontFamily: "serif",
          fontWeight: "100",
          letterSpacing: "2px",
        }}
      >
        {watch.name}
      </p>
      <p
        className="text-[14px] mt-5 cursor-pointer"
        style={{
          fontFamily: "serif",
          fontWeight: "100",
          letterSpacing: "2px",
        }}
      >
        {symbolCurrencies[currency]} {priceText} {currency}{" "}
      </p>
    </div>
  );
}
