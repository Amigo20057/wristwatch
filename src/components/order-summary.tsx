"use client";

import useFormatPrice from "@/hooks/useFormatPrice";
import { ICart } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";
import OrderSummaryItem from "./order-summary-item";

export default function OrderSummary({ cart }: { cart: ICart }) {
  const { priceText, currency } = useFormatPrice(cart.totalPrice);

  return (
    <aside className="w-full">
      <div className="sticky top-0">
        <div className="mx-auto w-full max-w-[520px] px-6 py-10">
          <div className="space-y-6">
            {cart.items.map((item, index) => (
              <OrderSummaryItem
                key={item.watch.id?.toString() ?? index}
                item={item}
              />
            ))}
          </div>

          <div className="mt-10 space-y-3 text-[13px] text-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span>
                {symbolCurrencies[currency]} {priceText}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Shipping</span>
              <span className="text-gray-500">Enter shipping address</span>
            </div>

            <div className="h-px w-full bg-[#e6e6e6]" />

            <div className="flex items-end justify-between">
              <p className="text-[16px] font-semibold">Total</p>

              <div className="flex items-end gap-2">
                <span className="text-[11px] text-gray-500 mb-[2px]">
                  {currency}
                </span>
                <span className="text-[20px] font-semibold">
                  {symbolCurrencies[currency]} {priceText}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[12px] text-gray-500">
            Taxes included. Discounts calculated at checkout.
          </p>
        </div>
      </div>
    </aside>
  );
}
