"use client";

import { useEffect } from "react";
import { useWatchStore } from "@/store/watch.store";
import { IWatch } from "@/types/watch.interface";
import Watches from "@/components/watches";

export default function WatchesClient({
  initialWatches,
}: {
  initialWatches: IWatch[];
}) {
  const { data, status, setWatchState } = useWatchStore();

  console.log(data);

  useEffect(() => {
    setWatchState("success", initialWatches);
  }, [initialWatches, setWatchState]);

  if (status === "loading") return <section>Loading...</section>;
  if (status === "error") return <section>Error</section>;

  return (
    <section className="pt-10 flex flex-col gap-10">
      <Watches titleText="Modern Elegance" type="Best Seller" limit={3} />
      <Watches titleText="Skeleton Automatic " type="Best Seller" limit={4} />
      <Watches titleText="Classic " type="Best Seller" limit={4} />
      <Watches titleText="Elegance " type="Best Seller" limit={4} />
    </section>
  );
}
