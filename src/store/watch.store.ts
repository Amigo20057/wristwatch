import { IWatch } from "@/types/watch.interface";
import { create } from "zustand";

export type WatchStatus = "success" | "error" | "loading";

interface WatchState {
  data: IWatch[];
  status: WatchStatus;
  setWatchState: (status: WatchStatus, data: IWatch[]) => void;
}

export const useWatchStore = create<WatchState>((set) => ({
  data: [],
  status: "loading",
  setWatchState: (status, data) => set({ status, data }),
}));
