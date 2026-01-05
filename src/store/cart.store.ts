import { ICart } from "@/types/cart.interface";
import { create } from "zustand";

interface CartState {
  cart: ICart;
  setCart: (cart: ICart) => void;
  clearCart: () => void;
}

const initialCart: ICart = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

export const useCartStore = create<CartState>((set) => ({
  cart: initialCart,
  setCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: initialCart }),
}));
