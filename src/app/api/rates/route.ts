import { NextResponse } from "next/server";

type NbuRow = { cc: string; rate: number };

export async function GET() {
  const res = await fetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const data = (await res.json()) as NbuRow[];

  const USD_UAH = data.find((x) => x.cc === "USD")?.rate;
  const EUR_UAH = data.find((x) => x.cc === "EUR")?.rate;

  if (!USD_UAH || !EUR_UAH) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, rates: { USD_UAH, EUR_UAH } });
}
