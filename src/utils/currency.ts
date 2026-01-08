import "server-only";
import { cookies } from "next/headers";
import {
  CountryCode,
  Currency,
  isCountry,
  isCurrency,
} from "@/types/currency.interface";

export async function getCurrency(): Promise<Currency> {
  const cookieStore = await cookies();
  const c = cookieStore.get("currency")?.value as Currency;

  return isCurrency(c) ? c : "USD";
}

export async function getCountry(): Promise<CountryCode> {
  const cookieStore = await cookies();
  const c = cookieStore.get("country")?.value as CountryCode;

  return isCountry(c) ? c : "UA";
}
