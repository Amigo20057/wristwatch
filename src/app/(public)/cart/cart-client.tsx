"use client";

import ButtonCommonLink from "@/components/button-common-link";
import OrderCard from "@/components/order-card";
import useFormatPrice from "@/hooks/useFormatPrice";
import { useCartStore } from "@/store/cart.store";
import type { ICart } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartClient({ initialCart }: { initialCart: ICart }) {
  const router = useRouter();
  const { cart, setCart } = useCartStore();
  const { priceText, currency } = useFormatPrice(cart?.totalPrice || 0);

  console.log(cart);

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart, setCart]);

  return (
    <div
      className={`w-full ${
        cart?.items.length > 0 ? "min-h-[700px]" : "min-h-[200px]"
      } bg-white flex justify-center pb-20`}
    >
      {cart?.items.length > 0 ? (
        <div className="w-[1100px] pt-10">
          <h1
            className="mb-10"
            style={{
              fontSize: "53px",
              fontFamily: "serif",
              fontWeight: "100",
            }}
          >
            Your cart
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] pb-4 border-b border-[#eeeeee] text-[11px] tracking-[0.2em] text-gray-500">
            <span>PRODUCT</span>
            <span className="text-center">QUANTITY</span>
            <span className="text-right">TOTAL</span>
          </div>

          {cart.items.map((item) => (
            <OrderCard key={item.id} item={item} />
          ))}

          <div className="flex justify-end mt-16">
            <div className="w-[380px] text-right">
              <div
                className="flex justify-end text-[16px] mb-3"
                style={{
                  fontFamily: "serif",
                  fontWeight: "100",
                  letterSpacing: "2px",
                }}
              >
                <span className="mr-10">Estimated total</span>
                <span>
                  {symbolCurrencies[currency]} {priceText} {currency}
                </span>
              </div>

              <button
                className="w-full h-[56px] bg-black text-white cursor-pointer transition-transform duration-100 ease-out hover:scale-105"
                onClick={() => router.push("/checkouts")}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[1100px] pt-10 flex flex-col items-center">
          <h1
            className="mb-10"
            style={{
              fontSize: "45px",
              fontFamily: "serif",
              fontWeight: "100",
            }}
          >
            Your cart is empty
          </h1>
          <ButtonCommonLink href="/watches" text="Continue shopping" />
        </div>
      )}
    </div>
  );
}
