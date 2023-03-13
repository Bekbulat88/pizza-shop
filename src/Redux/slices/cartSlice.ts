import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const {items, totalPrice} = getCartFromLS();

const initialState : CartSliceState = {
  totalPrice,
  items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action : PayloadAction<CartItemType>) {
      const findItem = state.items.find((elem) => elem.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action : PayloadAction<number>) {
      const findItem = state.items.find((elem) => elem.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((elem) => elem.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelect = (state : RootState) => state.cart;
export const cartSelectItemsById = (id : number) => (state : RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
