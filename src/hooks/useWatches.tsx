import fetchWatch from "@/actions/watch";
import { WatchStatus } from "@/store/watch.store";
import { IWatch } from "@/types/watch.interface";
import { useEffect, useState } from "react";

export default function useWatches() {
  const [data, setData] = useState<IWatch[] | null>(null);
  const [status, setStatus] = useState<WatchStatus>("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWatch();
        setData(result);
        setStatus("success");
      } catch (e) {
        setData(null);
        setStatus("error");
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return { data, status };
}
