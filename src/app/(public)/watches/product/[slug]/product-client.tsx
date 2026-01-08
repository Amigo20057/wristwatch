"use client";

import { useCurrencyContext } from "@/hoc/currency";
import useRates from "@/hooks/useRates";
import { useCartStore } from "@/store/cart.store";
import { ICart } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";
import { IWatch } from "@/types/watch.interface";
import { convertFromUsd, formatMoney } from "@/utils/price";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function ProductClient({ watch }: { watch: IWatch }) {
  const [productCount, setProductCount] = useState<number>(1);
  const { cart, setCart } = useCartStore();
  const currency = useCurrencyContext();
  const rates = useRates();

  const value = rates
    ? convertFromUsd(watch.price, currency, rates)
    : watch.price;
  const priceText = rates ? formatMoney(value, currency) : "0,000";

  console.log(cart);

  const incrementCountProduct = useCallback(() => {
    setProductCount((prev) => prev + 1);
  }, []);

  const decrementCountProduct = useCallback(() => {
    setProductCount((prev) => Math.max(1, prev - 1));
  }, []);

  const handleAddToCart = async (watch: IWatch) => {
    const cartRaw = localStorage.getItem("cart");

    const cart: ICart = cartRaw
      ? JSON.parse(cartRaw)
      : { items: [], totalCount: 0, totalPrice: 0 };

    const existingIndex = cart.items.findIndex(
      (item) => item.watch.id === watch.id
    );

    if (existingIndex !== -1) {
      const item = cart.items[existingIndex];
      const newQuantity = item.quantity + productCount;

      cart.items[existingIndex] = {
        ...item,
        quantity: newQuantity,
        totalPrice: newQuantity * item.watch.price,
      };
    } else {
      cart.items.push({
        id: Number(watch?.id),
        watch,
        quantity: productCount,
        totalPrice: productCount * watch.price,
      });
    }

    cart.totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    localStorage.setItem("cart", JSON.stringify(cart));

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });

    setCart(cart);
    setProductCount(1);
  };

  return (
    <section className="pt-10 pb-10 flex flex-col gap-10 min-h-screen">
      <div className="w-[1200px] m-auto flex ">
        <Image
          src={watch.images[0]}
          alt={watch.images[0]}
          width={715}
          height={1070}
          className="bg-[#f2f2f2]"
        />
        <div className="ml-10 max-w-[345px]">
          <p
            className="text-[13px] text-[#5a5a5a]"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "1px",
            }}
          >
            Loro Peveriente
          </p>
          <h1
            className="text-[32px]"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "3px",
            }}
          >
            {watch.name}
          </h1>
          <p
            className="text-[19px] mt-5"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "2px",
            }}
          >
            {symbolCurrencies[currency]} {priceText} {currency}{" "}
          </p>
          <div>
            <p
              className="text-[12px] text-[#5a5a5a] mt-5 mb-2"
              style={{
                fontFamily: "serif",
                fontWeight: "100",
                letterSpacing: "3px",
              }}
            >
              Quantity
            </p>
            <div className="border w-[142px] h-[47px] flex items-center justify-around">
              <button
                className="cursor-pointer"
                onClick={decrementCountProduct}
              >
                <Minus size={14} />
              </button>
              <p>{productCount}</p>
              <button
                className="cursor-pointer"
                onClick={incrementCountProduct}
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              className={`inline-block text-white bg-black px-[40px] py-[10px] w-full mt-7 cursor-pointer
              transition-transform
              duration-100
              ease-out
              hover:scale-105
              `}
              onClick={() => handleAddToCart(watch)}
            >
              <span style={{ fontFamily: "serif", fontSize: "14px" }}>
                Add to card
              </span>
            </button>
          </div>
          <div>
            <p
              className="text-[16px] text-[#5a5a5a] mt-5 mb-2 cursor-pointer"
              style={{
                fontFamily: "serif",
                letterSpacing: "1px",
              }}
            >
              {watch.description}
            </p>
            <ul
              style={{
                fontFamily: "serif",
              }}
              className="text-[#5a5a5a] list-disc pl-10 mt-5
            [&_li]:p-1 
            "
            >
              <li>Made of Premium Stainless Steel</li>
              <li>Movement: {watch.movement}</li>
              <li>Water resistance: {watch.waterResistance}</li>
              <li>Diameter: {watch.diameter}</li>
            </ul>
            <p className="text-[#5a5a5a] mt-5">
              <span className="text-black font-semibold">Size:</span>{" "}
              {watch.size}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
