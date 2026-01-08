"use client";

import { registerUser, signInWithCredentials } from "@/actions/auth";
import type { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

interface IProps {
  type: "register" | "login";
}

export default function Form({ type }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const router = useRouter();
  const { update } = useSession();

  const onSubmit = async (data: IUser) => {
    try {
      if (type === "register") {
        const user = await registerUser(data);
        if (typeof user === "object" && "error" in user) {
          console.error(user.error);
          return;
        }
      }

      const result = await signInWithCredentials(data.email, data.password);

      if (result?.error) {
        console.error("Sign in error:", result.error);
        return;
      }

      await update();

      router.refresh();

      router.push("/");
    } catch (error) {
      console.error("Form error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {type === "register" && (
        <>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Surname"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
              {...register("surname", { required: "Surname is required" })}
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.surname.message}
              </p>
            )}
          </div>
        </>
      )}
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Minimum 5 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-[#5b33ff] hover:bg-[#4b2adb] transition text-white rounded-lg py-3 font-semibold mt-2"
      >
        {type === "login" ? "Continue" : "Create account"}
      </button>
      {type === "login" ? (
        <p className="text-gray-700">
          Haven&apos;t created an account yet?{" "}
          <span
            className="underline cursor-pointer hover:opacity-50"
            onClick={() => router.push("/auth/register")}
          >
            Sign up
          </span>
        </p>
      ) : (
        <p className="text-gray-700">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:opacity-50"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </span>
        </p>
      )}
    </form>
  );
}
