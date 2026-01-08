"use client";

import { useEffect, useState } from "react";
import type { Rates } from "@/utils/price";
import { api } from "@/utils/api";

export default function useRates() {
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await api<{ ok: boolean; rates: Rates }>("rates", "GET");
        if (!alive) return;
        setRates(data.rates);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return rates;
}
