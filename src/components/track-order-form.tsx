"use client";

import { getOrder } from "@/actions/order";
import type { ITrackOrder } from "@/types/order.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TrackOrderForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ITrackOrder>({
    mode: "onBlur",
    defaultValues: {
      order: "",
      phoneNumber: "",
    } as ITrackOrder,
  });

  const onSubmit = async (data: ITrackOrder) => {
    try {
      setServerError(null);
      setIsLoading(true);

      const result = await getOrder(data);

      reset();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-[400px] h-[340px] bg-white rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="flex flex-col p-5">
        <div className="border-b-2 p-5 cursor-pointer mb-3">
          <p style={{ fontFamily: "serif" }} className="text-center">
            Номер замовлення
          </p>
        </div>

        <div className="[&_input]:border [&_input]:w-full [&_input]:h-12 [&_input]:rounded-xl [&_input]:my-2 [&_input]:pl-5 [&_input]:text-[14px]">
          <div>
            <input
              type="text"
              placeholder="Номер замовлення"
              {...register("order", {
                required: "Номер замовлення є обов'язковим",
                minLength: {
                  value: 4,
                  message: "Номер замовлення занадто короткий",
                },
                maxLength: {
                  value: 30,
                  message: "Номер замовлення занадто довгий",
                },
                pattern: {
                  value: /^[A-Za-z0-9-_]+$/,
                  message: "Допускаються лише літери, цифри, '-' та '_'",
                },
              })}
            />
            {errors.order && (
              <p className="text-red-500 text-[12px] -mt-1">
                {errors.order.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Номер телефону (+380...)"
              inputMode="tel"
              {...register("phoneNumber", {
                required: "Номер телефону є обов'язковим",
                validate: (value) => {
                  const digits = value.replace(/\D/g, "");
                  if (digits.startsWith("380") && digits.length === 12) {
                    return true;
                  }
                  if (digits.startsWith("0") && digits.length === 10) {
                    return true;
                  }
                  return "Введіть дійсний номер телефону України";
                },
              })}
            />

            {errors.phoneNumber && (
              <p className="text-red-500 text-[12px] -mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {serverError && (
          <p className="text-red-600 text-[13px] mt-2">{serverError}</p>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full h-[60px] bg-black text-white rounded-xl mt-3 transition-transform duration-100 ease-out hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading || isSubmitting
              ? "Відстеження..."
              : "Відстежити замовлення"}
          </button>
        </div>
      </div>
    </form>
  );
}
