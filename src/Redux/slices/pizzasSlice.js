import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, categoryId, searchText, currentPage } = params;
  const { data } = await axios.get(
    `https://6400c3e49f84491029986be2.mockapi.io/items?${
      categoryId > 0 ? 'category=' + categoryId : ''
    }&sortBy=${sortBy}&order=${order}&search=${searchText}&page=${currentPage}&limit=4`,
  );
  return data;
});

const initialState = {
  status: 'loading',
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const pizzaSelect = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;