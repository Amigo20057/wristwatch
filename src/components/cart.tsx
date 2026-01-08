"use client";

import type { ICart } from "@/types/cart.interface";
import { useState } from "react";

const getCartFromLocalStorage = (): ICart | null => {
  return JSON.parse(window.localStorage.getItem("cart") ?? "");
};

export default function Cart() {
  const [watches, setWatches] = useState<ICart | null>(getCartFromLocalStorage);

  return <div></div>;
}
