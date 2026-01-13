"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderCheckouts() {
  const router = useRouter();
  return (
    <header className="w-full h-[90px]! bg-white text-black flex items-center justify-center sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-[1200px] m-auto p-[0_50px] flex items-center justify-between px-8">
        <div className="flex items-center tracking-[0.2em] font-light">
          <div
            className="flex flex-col text-center !mr-[50px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span>L O R O</span>
            <span className="text-[10px] opacity-60">P E V E R I A N T E</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <ShoppingBag
            color="blue"
            onClick={() => router.push("/cart")}
            size={20}
            className="cursor-pointer opacity-80           
            transition-transform
            duration-100
            ease-out
            hover:scale-110"
          />
        </div>
      </div>
    </header>
  );
}
