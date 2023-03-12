import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  categoryId : number;
  searchValue: string;
  currentPage : number
}
export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzasArgs>('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, categoryId, searchValue, currentPage } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://6400c3e49f84491029986be2.mockapi.io/items?${
      categoryId > 0 ? 'category=' + categoryId : ''
    }&sortBy=${sortBy}&order=${order}&search=${searchValue}&page=${currentPage}&limit=4`,
  );
  return data;
});

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl:string;
  sizes:number[];
  types:number[];
}

interface PizzaSliceState {
  items:  Pizza[];
  status: 'loading' | 'success' | 'error' ;
}

const initialState : PizzaSliceState = {
  status: 'loading',
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action : PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const pizzaSelect = (state : RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
