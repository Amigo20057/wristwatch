"use client";

import Form from "@/components/form";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-xl w-full max-w-[420px] p-10">
      <div
        className="text-center mb-8 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h1 className="text-[34px] tracking-[8px]">L O R O</h1>
        <p className="text-xs tracking-[4px] opacity-60">PEVERIENTE</p>
      </div>
      <h2 className="text-xl font-semibold mb-1">Увійдіть</h2>
      <p className="text-sm text-gray-500 mb-6">
        Виберіть, як ви хочете увійти
      </p>
      <Form type="login" />
      <div className="text-center text-sm text-gray-500 mt-10 flex justify-center gap-6">
        <button>Privacy policy</button>
        <button>Terms of service</button>
      </div>
    </div>
  );
}
