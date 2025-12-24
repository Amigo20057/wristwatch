"use client";

import { useEffect } from "react";
import { useWatchStore } from "@/store/watch.store";
import { IWatch } from "@/types/watch.interface";
import Card from "@/components/card";

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
    <section>
      {data.map((w) => (
        <Card key={w.id} watch={w} />
      ))}
    </section>
  );
}
