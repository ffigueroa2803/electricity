import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 8,
  search: "",
  modal: false,
  brandSelected: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    brandChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    brandSearch: (state, action) => {
      state.search = action.payload;
    },
    brandClearInit: (state) => {
      state.page = 1;
      state.limit = 8;
      state.search = "";
    },
    setBrandSelected: (state, action) => {
      state.brandSelected = action.payload;
    },
  },
});

export const {
  brandChangeCurrentPage,
  brandSearch,
  brandClearSearch,
  brandClearInit,
  setBrandSelected,
} = brandSlice.actions;
export default brandSlice.reducer;
