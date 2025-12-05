"use client";

import { signOutFunc } from "@/actions/auth";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { setAuthState } = useAuthStore();
  const handleLogout = async () => {
    try {
      await signOutFunc();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
    setAuthState("unauthenticated", null);
  };
  return (
    <div className="w-full h-screen">
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
