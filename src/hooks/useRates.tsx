"use client";

import { useEffect, useState } from "react";
import type { Rates } from "@/utils/price";

export default function useRates() {
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      const res = await fetch("/api/rates");
      const json = await res.json();

      if (!alive) return;
      if (json?.ok) setRates(json.rates);
    })();

    return () => {
      alive = false;
    };
  }, []);

  return rates;
}
