"use client";

import { useEffect, useState } from "react";
import type { Rates } from "@/utils/price";
import { api } from "@/utils/api";

let cache: Rates | null = null;
let inflight: Promise<Rates> | null = null;

async function getRatesOnce(): Promise<Rates> {
  if (cache) return cache;

  if (!inflight) {
    inflight = api<{ ok: boolean; rates: Rates }>("rates", "GET").then((d) => {
      cache = d.rates;
      return cache;
    });
  }

  return inflight;
}

export default function useRates() {
  const [rates, setRates] = useState<Rates | null>(cache);

  useEffect(() => {
    let alive = true;

    getRatesOnce()
      .then((r) => {
        if (alive) setRates(r);
      })
      .catch(console.error);

    return () => {
      alive = false;
    };
  }, []);

  return rates;
}
