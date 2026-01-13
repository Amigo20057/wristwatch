import useFormatPrice from "@/hooks/useFormatPrice";
import { ICart } from "@/types/cart.interface";
import { symbolCurrencies } from "@/types/currency.interface";

export default function OrderSummary({ cart }: { cart: ICart }) {
  const { priceText, currency } = useFormatPrice(cart.totalPrice);

  console.log("OrderSummary cart:", cart);

  return (
    <aside className="w-full">
      <div className="sticky top-0">
        <div className="mx-auto w-full max-w-[520px] px-6 py-10">
          <div className="flex items-start gap-4">
            <div className="relative h-[56px] w-[56px] rounded-lg bg-white border border-[#e6e6e6] flex items-center justify-center">
              <div className="h-[42px] w-[42px] rounded bg-[#f0f0f0]" />
              <div className="absolute -top-2 -right-2 h-[18px] w-[18px] rounded-full bg-black text-white text-[11px] flex items-center justify-center">
                1
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[13px] text-[#1a1a1a]">
                Peveriente Automatic - Black/Gold
              </p>
              <p className="mt-1 text-[12px] text-gray-500">
                First payment €930.00, then €29.99 every month
              </p>
            </div>

            <div className="text-[13px] text-[#1a1a1a]">€930.00</div>
          </div>

          <div className="mt-10 space-y-3 text-[13px] text-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span>€930.00</span>
            </div>

            <div className="h-px w-full bg-[#e6e6e6]" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[16px] font-semibold">Total</p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-[20px] font-semibold">
                  {symbolCurrencies[currency]} {priceText} {currency}
                </span>
              </div>
            </div>

            <p className="text-[12px] text-gray-500">Recurring subtotal</p>
            <p className="text-[12px] text-gray-500">
              First payment €930.00, then €29.99 every month
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
