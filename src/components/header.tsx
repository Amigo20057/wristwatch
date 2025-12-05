"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, session, status, setAuthState } = useAuthStore();

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/watches", name: "Watches" },
    { path: "/order", name: "Track Your Order" },
    { path: "/contact", name: "Contact" },
  ];

  console.log(status);

  return (
    <header className="w-full h-[90px] bg-[#2b323f] text-white flex items-center justify-center">
      <div className="w-full max-w-[1200px] m-auto p-[0_50px] flex items-center justify-between px-8">
        <div className="flex items-center tracking-[0.2em] font-light">
          <div className="flex flex-col text-center !mr-[50px] cursor-pointer">
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
                        : "opacity-80 hover:opacity-100 "
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
          <div className="flex items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer">
            <span>United States</span>
            <span className="mx-1">|</span>
            <span>USD $</span>
            <span className="text-xs">⌄</span>
          </div>

          <Search
            size={20}
            className="cursor-pointer opacity-80 hover:opacity-100"
          />
          <User
            onClick={() => {
              if (isAuth) {
                router.push("/profile");
              } else {
                router.push("/auth/login");
              }
            }}
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
