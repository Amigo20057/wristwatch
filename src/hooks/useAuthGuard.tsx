"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthGuard(path: string) {
  const router = useRouter();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (isAuth) {
      router.push(`/${path}`);
    } else {
      router.push("/auth/login");
    }
  }, [isAuth, router, path]);
}
