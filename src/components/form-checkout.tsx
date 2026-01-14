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
      state: "Україна",
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
          <h2 className="text-[22px] font-semibold text-[#1a1a1a]">
            Контактна інформація
          </h2>
        </div>

        <div className="mt-4">
          <input
            placeholder="Електронна пошта"
            className="h-11 w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("email", {
              required: "Електронна пошта є обовʼязковою",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Некоректна електронна пошта",
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
          Доставка
        </h2>

        <div className="mt-4">
          <select
            className="h-11 w-full rounded-lg border border-[#dadada] bg-white px-4 text-[14px] outline-none focus:border-black"
            {...register("state")}
            defaultValue="Україна"
          >
            <option>Україна</option>
            <option>Німеччина</option>
            <option>Сполучені Штати</option>
          </select>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <input
              placeholder="Імʼя "
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("firstName")}
            />
          </div>
          <div>
            <input
              placeholder="Прізвище"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("lastName", {
                required: "Прізвище є обовʼязковим",
              })}
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
            placeholder="Адреса"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("address", {
              required: "Адреса є обовʼязковою",
            })}
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
              placeholder="Поштовий індекс"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("zipCode", {
                required: "Поштовий індекс є обовʼязковим",
              })}
            />
            {errors.zipCode && (
              <p className="mt-2 text-[12px] text-red-600">
                {String(errors.zipCode.message)}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Місто"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("city", {
                required: "Місто є обовʼязковим",
              })}
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
            placeholder="Телефон"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("phone", {
              required: "Номер телефону є обовʼязковим",
            })}
          />
          {errors.phone && (
            <p className="mt-2 text-[12px] text-red-600">
              {String(errors.phone.message)}
            </p>
          )}
        </div>
        <h2 className="mt-10 text-[22px] font-semibold text-[#1a1a1a]">
          Оплата
        </h2>
        <p className="mt-1 text-[12px] text-gray-500">
          Усі транзакції захищені та зашифровані.
        </p>
        <div className="mt-4 space-y-3">
          <input
            placeholder="Номер картки"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("cardNumber", {
              required: "Номер картки є обовʼязковим",
            })}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              placeholder="Термін дії (ММ/РР)"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("expirationDate", {
                required: "Термін дії є обовʼязковим",
              })}
            />

            <input
              placeholder="CVV / CVC"
              className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
              {...register("securityCode", {
                required: "Код безпеки є обовʼязковим",
              })}
            />
          </div>

          <input
            placeholder="Імʼя на картці"
            className="h-[44px] w-full rounded-lg border border-[#dadada] px-4 text-[14px] outline-none focus:border-black"
            {...register("nameOnCard", {
              required: "Імʼя на картці є обовʼязковим",
            })}
          />
        </div>

        <button
          type="submit"
          className="mt-10 h-[52px] w-full rounded-lg bg-black text-white text-[14px] tracking-wide hover:opacity-90"
        >
          Оплатити зараз
        </button>

        <p className="mt-5 text-[12px] text-gray-500 leading-5">
          Оформлюючи замовлення, ви погоджуєтеся з нашими умовами та політикою
          конфіденційності.
        </p>
      </div>
    </form>
  );
}
