"use client";

import { changeUserNameById } from "@/actions/user";
import { useAuthStore } from "@/store/auth.store";
import { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";

export default function ProfileInfo({ session }: { session: Session }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthState, status } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const initialName = useMemo(
    () => session?.user?.name ?? "",
    [session?.user?.name]
  );
  const initialSurname = useMemo(
    () => session?.user?.surname ?? "",
    [session?.user?.surname]
  );

  const [name, setName] = useState(initialName);
  const [surname, setSurname] = useState(initialSurname);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setSurname(initialSurname);
    }
  }, [isOpen, initialName, initialSurname]);

  const closeModal = () => setIsOpen(false);

  const saveProfile = async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoading(true);

      const updated = await changeUserNameById(session.user.id, name, surname);

      setAuthState(status === "loading" ? "authenticated" : status, {
        ...session,
        user: {
          ...session.user,
          name: updated.name,
          surname: updated.surname,
        },
      });

      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  if (!session?.user) return null;

  return (
    <>
      <aside className="sticky top-10 h-fit">
        <div className="border border-[#eeeeee] rounded-2xl p-6">
          <p className="text-[11px] tracking-[0.2em] text-gray-500">
            ОСОБИСТА ІНФОРМАЦІЯ
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-gray-500">
                {`ПОВНЕ ІМ'Я`}
              </p>
              <p
                className="mt-1 text-[18px]"
                style={{
                  fontFamily: "serif",
                  fontWeight: "100",
                  letterSpacing: "1px",
                }}
              >
                {session.user.name} {session.user.surname}
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] text-gray-500">
                EMAIL
              </p>
              <p className="mt-1 text-[14px] text-gray-700">
                {session.user.email}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full h-[48px] bg-black text-white text-[12px] tracking-[0.2em] hover:opacity-90"
              >
                РЕДАГУВАТИ ПРОФІЛЬ
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-[999]">
          <div className="absolute inset-0 bg-black/30" onClick={closeModal} />

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="w-[460px] bg-white rounded-2xl p-8">
              <p
                className="text-[12px] tracking-[0.25em] text-gray-500"
                style={{ letterSpacing: "0.25em" }}
              >
                РЕДАГУВАТИ ПРОФІЛЬ
              </p>

              <h2
                className="mt-3"
                style={{
                  fontSize: "32px",
                  fontFamily: "serif",
                  fontWeight: "100",
                  letterSpacing: "1px",
                }}
              >
                Особиста інформація
              </h2>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-[11px] tracking-[0.2em] text-gray-500">
                    {"ІМ'Я"}
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full h-[46px] border border-[#dddddd] rounded-xl px-4 text-[14px] outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] tracking-[0.2em] text-gray-500">
                    ПРІЗВИЩЕ
                  </label>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="mt-2 w-full h-[46px] border border-[#dddddd] rounded-xl px-4 text-[14px] outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  disabled={isLoading}
                  className="h-[44px] px-6 border border-black text-[12px] tracking-[0.2em] hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                >
                  СКАСУВАТИ
                </button>

                <button
                  onClick={saveProfile}
                  disabled={isLoading}
                  className="h-[44px] px-6 bg-black text-white text-[12px] tracking-[0.2em] hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? "ЗБЕРЕЖЕННЯ..." : "ЗБЕРЕЖИТИ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
