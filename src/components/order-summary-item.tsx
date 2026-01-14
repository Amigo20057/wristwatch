import useFormatPrice from "@/hooks/useFormatPrice";
import { ICartItem } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";
import Image from "next/image";

export default function OrderSummaryItem({ item }: { item: ICartItem }) {
  const { priceText, currency } = useFormatPrice(item.totalPrice);

  return (
    <div className="flex gap-4">
      <div className="relative h-[56px] w-[56px]">
        <div className="absolute inset-0 rounded-lg bg-white border border-[#e6e6e6] overflow-hidden">
          <Image
            src={item.watch.images[0]}
            alt={item.watch.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute -top-2 -right-2 z-10 h-[18px] min-w-[18px] px-[5px] rounded-full bg-black text-white text-[11px] leading-[18px] text-center">
          {item.quantity}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#1a1a1a] truncate">{item.watch.name}</p>
        {item.watch.tag && (
          <p className="mt-1 text-[12px] text-gray-500">{item.watch.tag}</p>
        )}
      </div>

      <div className="text-[13px] text-[#1a1a1a] whitespace-nowrap">
        {symbolCurrencies[currency]} {priceText}
      </div>
    </div>
  );
}
