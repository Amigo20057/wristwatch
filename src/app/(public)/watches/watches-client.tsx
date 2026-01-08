"use client";

import { useEffect } from "react";
import { useWatchStore } from "@/store/watch.store";
import type { IWatch } from "@/types/watch.interface";
import Watches from "@/components/watches";

export default function WatchesClient({
  initialWatches,
}: {
  initialWatches: IWatch[];
}) {
  const { data, setWatchState } = useWatchStore();

  useEffect(() => {
    setWatchState("success", initialWatches);
  }, [initialWatches, setWatchState]);

  return (
    <section className="pt-10 flex flex-col gap-10 mb-20">
      <Watches titleText="Modern Elegance" type="Best Seller" limit={3} />
      <Watches titleText="Skeleton Automatic " type="Best Seller" limit={4} />
      <Watches titleText="Classic " type="Best Seller" limit={4} />
      <Watches titleText="Elegance " type="Best Seller" limit={4} />
    </section>
  );
}
