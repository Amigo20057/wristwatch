"use client";

import FormCheckout from "@/components/form-checkout";
import OrderSummary from "@/components/order-summary";
import useAuthGuard from "@/hooks/useAuthGuard";
import { ICart } from "@/types/cart.interface";
import { useSession } from "next-auth/react";

export default function CheckoutClient({ cart }: { cart: ICart }) {
  useAuthGuard("checkouts");
  const { data } = useSession();

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_520px]">
        <div className="bg-white">
          <FormCheckout userId={data?.user?.id as string} cart={cart} />
        </div>

        <div className="bg-[#f5f5f5] border-t lg:border-t-0 lg:border-l border-[#e6e6e6]">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
