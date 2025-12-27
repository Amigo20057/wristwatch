import { fetchWatch } from "@/actions/watch";
import WatchesClient from "./watches-client";

export default async function Watches() {
  const watches = await fetchWatch();
  return <WatchesClient initialWatches={watches} />;
}
