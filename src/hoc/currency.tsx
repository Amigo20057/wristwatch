"use client";

import { createContext, useContext } from "react";
import type { Currency } from "@/types/currency.interface";

const CurrencyContext = createContext<Currency>("USD");

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({
  currency,
  children,
}: {
  currency: Currency;
  children: React.ReactNode;
}) {
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}
