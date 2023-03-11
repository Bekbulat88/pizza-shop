import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sortType: { name: 'популярности', sortProperty: 'rating' },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.sortType = action.payload.sortType;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelect = (state) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setFilter, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
