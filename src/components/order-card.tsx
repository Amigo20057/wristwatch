import useFormatPrice from "@/hooks/useFormatPrice";
import type { ICartItem } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function OrderCard({ item }: { item: ICartItem }) {
  const { priceText, currency } = useFormatPrice(item.totalPrice);
  const { priceText: priceTextPrice } = useFormatPrice(item.watch.price);
  const [productCount, setProductCount] = useState<number>(item.quantity);

  const incrementCountProduct = useCallback(() => {
    setProductCount((prev) => prev + 1);
  }, []);

  const decrementCountProduct = useCallback(() => {
    setProductCount((prev) => Math.max(1, prev - 1));
  }, []);

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] py-10 border-b border-[#eeeeee]">
      <div className="flex gap-8">
        <div className="w-[120px] h-[160px] relative">
          <Image
            src={item.watch.images[0]}
            alt="Watch"
            fill
            className="object-contain bg-[#f0f0f0]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p
            className="text-[18px]"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "2px",
            }}
          >
            {item.watch.name}
          </p>
          <p
            className="text-[14px] text-gray-600"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "2px",
            }}
          >
            {symbolCurrencies[currency]} {priceTextPrice} {currency}{" "}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-start">
        <div className="border w-[142px] h-[47px] flex items-center justify-around">
          <button className="cursor-pointer" onClick={decrementCountProduct}>
            <Minus size={14} />
          </button>
          <p>{productCount}</p>
          <button className="cursor-pointer" onClick={incrementCountProduct}>
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div
        className="text-right text-[16px]"
        style={{
          fontFamily: "serif",
          fontWeight: "100",
          letterSpacing: "2px",
        }}
      >
        {symbolCurrencies[currency]} {priceText} {currency}{" "}
      </div>
    </div>
  );
}
