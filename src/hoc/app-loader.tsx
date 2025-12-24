"use client";

import { useAuthStore } from "@/store/auth.store";
import { useWatchStore } from "@/store/watch.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useWatches from "@/hooks/useWatches";

export const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const { data: watches, status: watchStatus } = useWatches();

  const { setAuthState } = useAuthStore();
  const { setWatchState } = useWatchStore();

  useEffect(() => {
    setAuthState(sessionStatus, sessionData);
  }, [sessionStatus, sessionData, setAuthState]);

  useEffect(() => {
    if (watchStatus === "success" && watches) {
      setWatchState("success", watches);
    } else if (watchStatus === "error") {
      setWatchState("error", []);
    }
  }, [watchStatus, watches, setWatchState]);

  return <>{children}</>;
};
