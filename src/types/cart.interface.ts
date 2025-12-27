import { IWatch } from "./watch.interface";

export interface ICart {
  id?: number;
  watches: (IWatch[] & { quantity: number }) | null;
}
