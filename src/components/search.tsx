"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useWatchStore } from "@/store/watch.store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { slugify } from "@/utils/slugify";

interface IProps {
  setIsOpenSearch: (val: boolean) => void;
}

export default function MySearch({ setIsOpenSearch }: IProps) {
  const { data } = useWatchStore();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const activeIndexRef = useRef(0);
  const [activeTick, setActiveTick] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const close = () => {
    setMounted(false);
    setTimeout(() => setIsOpenSearch(false), 200);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalized = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalized) return [];
    return data
      .filter((w) => w.name?.toLowerCase().includes(normalized))
      .slice(0, 8);
  }, [data, normalized]);

  const setQueryAndReset = (val: string) => {
    setQuery(val);
    activeIndexRef.current = 0;
    setActiveTick((t) => t + 1);
  };

  const goToWatch = (watchId: string, name: string) => {
    close();
    router.push(`/watches/product/${watchId}-${slugify(name)}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!results.length) return;

    const idx = Math.min(activeIndexRef.current, results.length - 1);
    const chosen = results[idx];
    if (chosen?.id) goToWatch(chosen.id, chosen.name);
  };

  const highlight = (text: string, q: string) => {
    const t = text ?? "";
    if (!q) return t;

    const lower = t.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) return t;

    const before = t.slice(0, idx);
    const mid = t.slice(idx, idx + q.length);
    const after = t.slice(idx + q.length);

    return (
      <>
        {before}
        <span className="underline underline-offset-2">{mid}</span>
        {after}
      </>
    );
  };

  const activeIndex = activeIndexRef.current;

  return (
    <div className="fixed inset-0 z-[999]">
      <div
        onClick={close}
        className={[
          "absolute inset-0 bg-white/50 transition-opacity duration-200 ease-out",
          mounted ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <div
        className={[
          "relative z-10 transition-transform duration-200 ease-out",
          mounted ? "translate-y-0" : "-translate-y-6",
        ].join(" ")}
      >
        <header className="w-full h-[90px] bg-[#2b323f] text-white flex items-center justify-center">
          <form onSubmit={onSubmit} className="w-[min(900px,92vw)] relative">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQueryAndReset(e.target.value)}
              onKeyDown={(e) => {
                if (!results.length) return;

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  activeIndexRef.current = Math.min(
                    activeIndexRef.current + 1,
                    results.length - 1
                  );
                  setActiveTick((t) => t + 1);
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  activeIndexRef.current = Math.max(
                    activeIndexRef.current - 1,
                    0
                  );
                  setActiveTick((t) => t + 1);
                }
              }}
              placeholder="Пошук "
              className="w-full h-[46px] px-4 text-white outline-none border-[#9fa3a8] border"
            />

            {query.trim().length > 0 && (
              <div className="absolute top-[56px] left-0 w-full bg-white text-black rounded-xl shadow-lg overflow-hidden">
                {results.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    Nothing found
                  </div>
                ) : (
                  <ul className="max-h-[420px] overflow-auto">
                    {results.map((w, i) => {
                      const img = w.images?.[0];
                      const active = i === activeIndex;

                      return (
                        <li
                          key={w.id}
                          onMouseEnter={() => {
                            activeIndexRef.current = i;
                            setActiveTick((t) => t + 1);
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => w.id && goToWatch(w.id, w.name)}
                          className={[
                            "flex items-center gap-3 px-4 py-3 cursor-pointer",
                            active ? "bg-gray-100" : "bg-white",
                          ].join(" ")}
                        >
                          <div className="relative w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                            {img ? (
                              <Image
                                src={img}
                                alt={w.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : null}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {highlight(w.name, normalized)}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Enter — open, Esc — close</span>
                  <button
                    type="button"
                    onClick={() => setQueryAndReset("")}
                    className="text-gray-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            <span className="hidden">{activeTick}</span>
          </form>
        </header>

        <div className="p-10"></div>
      </div>
    </div>
  );
}
