import type { IWatch } from "./watch.interface";

export interface ICartItem {
  id: number;
  watch: IWatch;
  quantity: number;
  totalPrice: number;
}

export interface ICart {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
  watch: IWatch | null;
}
