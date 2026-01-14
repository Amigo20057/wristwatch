"use client";

import { signOutFunc } from "@/actions/auth";
import { OrderWithItems } from "@/actions/order";
import ProfileHeader from "@/components/header/profile-header";
import FullPageLoader from "@/components/loader";
import ProfileInfo from "@/components/profile-info";
import { OrderStatus } from "@/generated/prisma/enums";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { IWatch } from "@/types/watch.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

function statusBadge(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case OrderStatus.PAID:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case OrderStatus.SHIPPED:
      return "bg-purple-100 text-purple-800 border-purple-200";
    case OrderStatus.CANCELLED:
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}
export default function ProfileClient({
  orders,
}: {
  orders: OrderWithItems[];
}) {
  useAuthGuard("profile");
  const router = useRouter();
  const { setAuthState, session, isAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOutFunc();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setAuthState("unauthenticated", null);
    }
  };

  if (!isAuth) {
    return (
      <FullPageLoader
        title="Preparing your profile"
        subtitle="Syncing your session and orders…"
      />
    );
  }

  return (
    <div className="w-full bg-white">
      <ProfileHeader handleLogout={handleLogout} />

      <div className="w-[1100px] mx-auto py-10 grid grid-cols-[360px_1fr] gap-10">
        <ProfileInfo session={session!} />

        <section>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-gray-500">
                ЗАМОВЛЕННЯ
              </p>
              <h2
                className="mt-2"
                style={{
                  fontSize: "28px",
                  fontFamily: "serif",
                  fontWeight: "100",
                  letterSpacing: "1px",
                }}
              >
                Ваша історія замовлень
              </h2>
            </div>

            <div className="text-[12px] text-gray-500">
              Всього замовлень:{" "}
              <span className="text-gray-800">{orders.length}</span>
            </div>
          </div>

          <div className="mt-6 border border-[#eeeeee] rounded-2xl overflow-hidden">
            <div className="flex justify-between px-6 py-4 text-[11px] tracking-[0.2em] text-gray-500 border-b border-[#eeeeee]">
              <span>ЗАМОВЛЕННЯ</span>
              <span>ПРОДУКТИ</span>
              <span>СТАТУС</span>
            </div>

            {orders.map((o) => (
              <div
                key={String(o.id)}
                className="px-6 py-6 border-b border-[#eeeeee] last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className="text-[16px]"
                      style={{
                        fontFamily: "serif",
                        fontWeight: "100",
                        letterSpacing: "1px",
                      }}
                    >
                      {o.orderNumber}
                    </p>
                    <p className="mt-2 text-[12px] text-gray-500">
                      Відправити до: {o.city}, {o.state}
                    </p>
                  </div>

                  <div className="text-[13px] text-gray-700">
                    <p>
                      {o.items.length} item{o.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="mt-2 text-[12px] text-gray-500 line-clamp-2">
                      {o.items.map((it) => it.watch.name).join(", ")}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center px-3 h-[28px] text-[11px] tracking-[0.15em] border rounded-full ${statusBadge(
                        o.status
                      )}`}
                    >
                      {String(o.status)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3 flex-wrap">
                  {o.items.slice(0, 3).map((w, idx: number) => (
                    <div
                      key={`${o.orderNumber}-${idx}`}
                      className="w-[220px] border border-[#eeeeee] rounded-xl p-3 flex gap-3"
                    >
                      <div className="w-[56px] h-[56px] bg-[#f0f0f0] rounded-lg overflow-hidden relative">
                        <Image
                          src={w.watch.images?.[0] ?? "/placeholder.png"}
                          alt={w.watch.name}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="text-[13px] truncate"
                          style={{ fontFamily: "serif", fontWeight: "100" }}
                        >
                          {w.watch.name}
                        </p>
                        <p className="text-[12px] text-gray-500 mt-1">
                          {w.watch.tag}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
