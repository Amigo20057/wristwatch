"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag } from "lucide-react";
import type { Currency } from "@/types/currency.interface";
import CurrencySelector from "./currency-selector";

export default function HeaderClient({
  initialCurrency,
}: {
  initialCurrency: Currency;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/watches", name: "Watches" },
    { path: "/track", name: "Track Your Order" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <header className="w-full h-[90px] bg-[#2b323f] text-white flex items-center justify-center sticky top-0 z-50">
      <div className="w-full max-w-[1200px] m-auto p-[0_50px] flex items-center justify-between px-8">
        <div className="flex items-center tracking-[0.2em] font-light">
          <div
            className="flex flex-col text-center !mr-[50px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span>L O R O</span>
            <span className="text-[10px] opacity-60">P E V E R I A N T E</span>
          </div>

          <nav>
            <ul className="flex items-center gap-8">
              {navItems.map((el) => (
                <li key={el.path}>
                  <Link
                    href={el.path}
                    className={`text-[14px] tracking-wide ${
                      pathname === el.path
                        ? "underline underline-offset-[6px]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <CurrencySelector initialCurrency={initialCurrency} />

          <Search
            size={20}
            className="cursor-pointer opacity-80 hover:opacity-100"
          />
          <User
            onClick={() => router.push("/profile")}
            size={20}
            className="cursor-pointer opacity-80 hover:opacity-100"
          />
          <ShoppingBag
            size={20}
            className="cursor-pointer opacity-80 hover:opacity-100"
          />
        </div>
      </div>
    </header>
  );
}
