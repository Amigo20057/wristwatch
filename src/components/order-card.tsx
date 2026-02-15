"use client";

import useFormatPrice from "@/hooks/useFormatPrice";
import { useCartStore } from "@/store/cart.store";
import type { ICart, ICartItem } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";
import { api } from "@/utils/api";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo } from "react";

export default function OrderCard({ item }: { item: ICartItem }) {
  const { cart, setCart } = useCartStore();

  const { priceText, currency } = useFormatPrice(item.totalPrice);
  const { priceText: priceTextPrice } = useFormatPrice(item.watch.price);

  const currencySymbol = useMemo(() => symbolCurrencies[currency], [currency]);

  const updateQuantity = useCallback(
    async (newQuantity: number) => {
      if (!cart) return;

      let updatedItems: ICartItem[];

      if (newQuantity <= 0) {
        updatedItems = cart.items.filter((i) => i.watch.id !== item.watch.id);
      } else {
        updatedItems = cart.items.map((i) =>
          i.watch.id === item.watch.id
            ? {
                ...i,
                quantity: newQuantity,
                totalPrice: newQuantity * i.watch.price,
              }
            : i,
        );
      }

      const updatedCart: Partial<ICart> = {
        items: updatedItems,
        totalCount: updatedItems.reduce((s, i) => s + i.quantity, 0),
        totalPrice: updatedItems.reduce((s, i) => s + i.totalPrice, 0),
      };

      await api<void>("cart", "POST", updatedCart);
      setCart(updatedCart as ICart);
    },
    [cart, item.watch.id, setCart],
  );

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] py-10 border-b border-[#eeeeee]">
      <div className="flex gap-8">
        <div className="w-[120px] h-[160px] relative">
          <Image
            src={item.watch.images[0]}
            alt={item.watch.name}
            fill
            className="object-contain bg-[#f0f0f0]"
          />
        </div>

        <div>
          <p className="text-[18px]">{item.watch.name}</p>
          <p className="text-[14px] text-gray-600">
            {currencySymbol} {priceTextPrice} {currency}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border w-[142px] h-[47px] flex items-center justify-around ">
          <button
            onClick={() => updateQuantity(item.quantity - 1)}
            className="cursor-pointer"
          >
            <Minus size={14} />
          </button>

          <p>{item.quantity}</p>

          <button
            onClick={() => updateQuantity(item.quantity + 1)}
            className="cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="text-right">
        {currencySymbol} {priceText} {currency}
      </div>
    </div>
  );
}
