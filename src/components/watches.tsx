"use client";

import { useWatchStore } from "@/store/watch.store";
import Card from "./card";
import { useMemo } from "react";
import type { IWatch } from "@/types/watch.interface";

type WatchType = "Best Seller" | "Modern Elegance" | "Classic" | "Elegance";

interface IProps {
  titleText: string;
  subText?: string;
  type: WatchType;
  limit?: number | null;
}

export default function Watches({
  titleText,
  subText,
  type,
  limit = null,
}: IProps) {
  const { data, status } = useWatchStore();

  const filteredData = useMemo<IWatch[]>(() => {
    return data
      .filter((el) => el.tag?.includes(type))
      .sort((a, b) => Number(a.id) - Number(b.id));
  }, [data, type]);

  const visibleData = useMemo(() => {
    return limit ? filteredData.slice(0, limit) : filteredData;
  }, [filteredData, limit]);

  if (status === "loading") return <section>Loading...</section>;
  if (status === "error") return <section>Error loading watches</section>;
  if (visibleData.length === 0) return <section>No watches</section>;

  return (
    <section className="max-w-[1200px] min-w-[1200px] m-auto pt-0 pl-[30px] pr-[30px]">
      <div className="mb-9">
        <h1
          className="text-[19px] mb-1"
          style={{
            fontFamily: "serif",
            fontWeight: "100",
            letterSpacing: "2px",
          }}
        >
          {titleText}
        </h1>

        {subText && (
          <h3
            className="italic text-[14px]"
            style={{
              fontWeight: "100",
              letterSpacing: "2px",
            }}
          >
            {subText}
          </h3>
        )}
      </div>

      <div className="flex gap-2">
        {visibleData.map((el) => (
          <Card key={el.id} watch={el} />
        ))}
      </div>
    </section>
  );
}
