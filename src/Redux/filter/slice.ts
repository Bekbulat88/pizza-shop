import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortType } from './types';

const initialState : FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortType: { name: 'популярности', sortProperty: 'rating' },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action : PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action : PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action : PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.sortType = action.payload.sortType;
    },
    setSearchValue(state, action:  PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilter, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
