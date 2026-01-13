"use client";

import { createOrder } from "@/actions/order";
import { ICart } from "@/types/cart.interface";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type CheckoutForm = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  nameOnCard: string;
};

export default function FormCheckout({
  userId,
  cart,
}: {
  userId: string;
  cart: ICart;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "Ukraine",
      zipCode: "",
      phone: "",
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
      nameOnCard: "",
    },
  });

  const onSubmit = async (form: CheckoutForm) => {
    try {
      await createOrder({
        userId,
        ...form,
        items: cart.items.map((it) => ({
          watchId: BigInt(it.watch.id!),
          quantity: it.quantity,
        })),
      });

      await api("cart", "DELETE");

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mx-auto w-full max-w-[560px] px-6 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-[22px] font-semibold text-[#1a1a1a]">Contact</h2>
        </div>

        <div className="mt-4">
          <input
            placeholder="Email"
            className="h-11 w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="mt-2 text-[12px] text-red-600">
              {String(errors.email.message)}
            </p>
          )}
        </div>

        <h2 className="mt-10 text-[22px] font-semibold text-[#1a1a1a]">
          Delivery
        </h2>

        <div className="mt-4">
          <select
            className="h-11 w-full rounded-lg border border-[#dadada] bg-white px-4 text-[14px] outline-none focus:border-black"
            {...register("state")}
            defaultValue="Ukraine"
          >
            <option>Ukraine</option>
            <option>Germany</option>
            <option>United States</option>
          </select>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <input
              placeholder="First name (optional)"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("firstName")}
            />
          </div>

          <div>
            <input
              placeholder="Last name"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="mt-2 text-[12px] text-red-600">
                {String(errors.lastName.message)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <input
            placeholder="Address"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="mt-2 text-[12px] text-red-600">
              {String(errors.address.message)}
            </p>
          )}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <input
              placeholder="Postal code"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("zipCode", { required: "Postal code is required" })}
            />
            {errors.zipCode && (
              <p className="mt-2 text-[12px] text-red-600">
                {String(errors.zipCode.message)}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="City"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="mt-2 text-[12px] text-red-600">
                {String(errors.city.message)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <input
            placeholder="Phone"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className="mt-2 text-[12px] text-red-600">
              {String(errors.phone.message)}
            </p>
          )}
        </div>

        {/* PAYMENT */}
        <h2 className="mt-10 text-[22px] font-semibold text-[#1a1a1a]">
          Payment
        </h2>
        <p className="mt-1 text-[12px] text-gray-500">
          All transactions are secure and encrypted.
        </p>

        <div className="mt-4 space-y-3">
          <input
            placeholder="Card number"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("cardNumber", { required: "Card number is required" })}
          />
          {errors.cardNumber && (
            <p className="text-[12px] text-red-600">
              {String(errors.cardNumber.message)}
            </p>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <input
                placeholder="Expiration date (MM/YY)"
                className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
                {...register("expirationDate", {
                  required: "Expiration date is required",
                })}
              />
              {errors.expirationDate && (
                <p className="mt-2 text-[12px] text-red-600">
                  {String(errors.expirationDate.message)}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Security code"
                className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
                {...register("securityCode", {
                  required: "Security code is required",
                })}
              />
              {errors.securityCode && (
                <p className="mt-2 text-[12px] text-red-600">
                  {String(errors.securityCode.message)}
                </p>
              )}
            </div>
          </div>

          <input
            placeholder="Name on card"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("nameOnCard", {
              required: "Name on card is required",
            })}
          />
          {errors.nameOnCard && (
            <p className="text-[12px] text-red-600">
              {String(errors.nameOnCard.message)}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-10 h-[52px] w-full rounded-lg bg-black text-white text-[14px] tracking-wide hover:opacity-90"
        >
          Pay now
        </button>

        <p className="mt-5 text-[12px] text-gray-500 leading-5">
          By placing your order you agree to our terms and privacy policy.
        </p>
      </div>
    </form>
  );
}
