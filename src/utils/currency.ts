import "server-only";
import { cookies } from "next/headers";
import { Currency, isCurrency } from "@/types/currency.interface";

export async function getCurrency(): Promise<Currency> {
  const cookieStore = await cookies();
  const c = cookieStore.get("currency")?.value;

  return isCurrency(c) ? c : "USD";
}
