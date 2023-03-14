import { RootState } from "../store";

export const cartSelect = (state : RootState) => state.cart;
export const cartSelectItemsById = (id : number) => (state : RootState) => state.cart.items.find((obj) => obj.id === id);
