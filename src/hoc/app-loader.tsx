"use client";

import { useAuthStore } from "@/store/auth.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const AppLoader = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session, status } = useSession();
  const { setAuthState } = useAuthStore();

  console.log("DURA", status);

  useEffect(() => {
    setAuthState(status, session);
  }, [session, status, setAuthState]);

  return <>{children}</>;
};
