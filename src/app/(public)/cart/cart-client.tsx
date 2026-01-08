"use client";

import { ICart } from "@/types/cart.interface";

export default function CartClient({ cart }: { cart: ICart }) {
  console.log("cart ", cart);

  return (
    <div className="w-full min-h-[700px] bg-white flex justify-center">
      <div className="w-[1100px] pt-10">
        <h1
          className="mb-5"
          style={{
            fontSize: "53px",
            fontFamily: "serif",
            fontWeight: "100",
          }}
        >
          Your cart
        </h1>
      </div>
    </div>
  );
}
