import {
  CountryCode,
  Currency,
  isCountry,
  isCurrency,
} from "@/types/currency.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { currency, country } = (await req.json()) as {
    currency?: Currency;
    country?: CountryCode;
  };

  if (!isCurrency(currency!)) {
    return NextResponse.json(
      { ok: false, error: "Invalid currency" },
      { status: 400 }
    );
  }

  if (!isCountry(country!)) {
    return NextResponse.json(
      { ok: false, error: "Invalid country" },
      { status: 400 }
    );
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("currency", currency, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  res.cookies.set("country", country, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
