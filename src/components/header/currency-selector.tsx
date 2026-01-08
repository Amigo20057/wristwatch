"use client";

import {
  CountryCode,
  CountryOption,
  Currency,
} from "@/types/currency.interface";
import { api } from "@/utils/api";
import { Check, ChevronDown, Globe, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const COUNTRIES: CountryOption[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    defaultCurrency: "USD",
    currencies: ["USD"],
    currencySymbol: { USD: "$", EUR: "€", UAH: "₴" },
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    defaultCurrency: "EUR",
    currencies: ["EUR", "USD"],
    currencySymbol: { USD: "$", EUR: "€", UAH: "₴" },
  },
  {
    code: "UA",
    name: "Ukraine",
    flag: "🇺🇦",
    defaultCurrency: "UAH",
    currencies: ["UAH", "USD", "EUR"],
    currencySymbol: { USD: "$", EUR: "€", UAH: "₴" },
  },
];

export default function CurrencySelector({
  initialCurrency,
  initialCountry,
}: {
  initialCurrency: Currency;
  initialCountry: CountryCode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"country" | "currency">("country");
  const [query, setQuery] = useState("");

  const [currency, setCurrency] = useState<Currency>(initialCurrency);

  const [countryCode, setCountryCode] = useState<CountryCode>(initialCountry);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const openDropdown = () => {
    setQuery("");
    setTab("country");
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const toggleDropdown = () => {
    if (open) {
      setOpen(false);
      return;
    }
    openDropdown();
  };

  const selectedCountry = useMemo(() => {
    return COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];
  }, [countryCode]);

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [query]);

  const availableCurrencies = selectedCountry.currencies;

  const currencySymbol = selectedCountry.currencySymbol[currency] ?? "";

  const persistCurrency = async (
    cur: Currency,
    cou: CountryCode = countryCode
  ) => {
    const prev = currency;
    setCurrency(cur);

    try {
      await api<void>("currency", "POST", { currency: cur, country: cou });
      router.refresh();
    } catch {
      setCurrency(prev);
    }
  };

  const onSelectCountry = async (code: CountryCode) => {
    setCountryCode(code);

    const country = COUNTRIES.find((c) => c.code === code)!;

    if (!country.currencies.includes(currency)) {
      await persistCurrency(country.defaultCurrency, code);
    }

    setTab("currency");
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onSelectCurrency = async (cur: Currency) => {
    await persistCurrency(cur);
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="group flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="hidden md:inline text-[13px] opacity-90">
          {selectedCountry.name}
        </span>

        <span className="hidden md:inline opacity-40">|</span>

        <span className="text-[13px] tracking-wide">
          <span className="opacity-90">{currencySymbol}</span>{" "}
          <span className="opacity-90">{currency}</span>
        </span>

        <ChevronDown
          size={16}
          className={`opacity-80 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-white text-black z-50">
          <div className="p-3 bg-gradient-to-b from-white to-gray-50 border-b">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <div className="leading-tight">
                  <div className="text-[13px] font-semibold">
                    Region & Currency
                  </div>
                  <div className="text-[12px] text-gray-500">
                    Choose country and currency
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setTab("country")}
                  className={`px-3 py-1.5 text-[12px] rounded-full transition ${
                    tab === "country"
                      ? "bg-white shadow-sm font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Country
                </button>
                <button
                  type="button"
                  onClick={() => setTab("currency")}
                  className={`px-3 py-1.5 text-[12px] rounded-full transition ${
                    tab === "currency"
                      ? "bg-white shadow-sm font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Currency
                </button>
              </div>
            </div>

            <div className="mt-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    tab === "country"
                      ? "Search country..."
                      : "Search currency..."
                  }
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-[13px]"
                />
              </div>
            </div>
          </div>

          <div className="max-h-[320px] overflow-auto">
            {tab === "country" ? (
              <div className="p-2">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => onSelectCountry(c.code)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg leading-none">{c.flag}</span>
                      <div className="leading-tight">
                        <div className="text-[13px] font-medium">{c.name}</div>
                        <div className="text-[12px] text-gray-500">
                          Default: {c.defaultCurrency}
                        </div>
                      </div>
                    </div>

                    {countryCode === c.code && (
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Check size={16} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {availableCurrencies
                  .filter((cur) =>
                    cur.toLowerCase().includes(query.trim().toLowerCase())
                  )
                  .map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => onSelectCurrency(cur)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[14px] font-semibold">
                          {selectedCountry.currencySymbol[cur]}
                        </div>
                        <div className="leading-tight">
                          <div className="text-[13px] font-medium">{cur}</div>
                          <div className="text-[12px] text-gray-500">
                            {cur === "USD"
                              ? "US Dollar"
                              : cur === "EUR"
                              ? "Euro"
                              : "Ukrainian Hryvnia"}
                          </div>
                        </div>
                      </div>

                      {currency === cur && (
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Check size={16} />
                        </span>
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-gray-50">
            <div className="flex items-center justify-between text-[12px] text-gray-600">
              <span>
                Selected:{" "}
                <b className="text-gray-900">{selectedCountry.code}</b> /{" "}
                <b className="text-gray-900">{currency}</b>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
