"use client";

import ButtonCommonLink from "@/components/button-common-link";
import OrderCard from "@/components/order-card";
import useFormatPrice from "@/hooks/useFormatPrice";
import type { ICart } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";

export default function CartClient({ cart }: { cart: ICart }) {
  const { priceText, currency } = useFormatPrice(cart?.totalPrice);

  console.log(cart);

  return (
    <div
      className={`w-full ${
        cart ? "min-h-[700px]" : "min-h-[200px]"
      } bg-white flex justify-center pb-20`}
    >
      {cart ? (
        <>
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

            {cart?.items?.map((item) => (
              <OrderCard item={item} key={item.id} />
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
                    {" "}
                    {symbolCurrencies[currency]} {priceText} {currency}{" "}
                  </span>
                </div>

                <p className="text-[12px] text-gray-500 mb-6 flex justify-between">
                  <span>Taxes included. Discounts and</span>
                  <span>calculated at checkout.</span>
                </p>

                <button
                  className="w-full h-[56px] bg-black text-white text-[14px] tracking-wide cursor-pointer
            transition-transform duration-100 ease-out hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-[1100px] pt-10 flex flex-col items-center">
          <h1
            className="mb-10 text-center"
            style={{
              fontSize: "45px",
              fontFamily: "serif",
              fontWeight: "100",
            }}
          >
            Your cart is empty
          </h1>
          <ButtonCommonLink href="/watches" text="Continue shopping " />
        </div>
      )}
    </div>
  );
}
