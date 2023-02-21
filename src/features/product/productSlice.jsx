import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 8,
  search: "",
  modal: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    productSearch: (state, action) => {
      state.search = action.payload;
    },
    productClearInit: (state) => {
      state.page = 1;
      state.limit = 8;
      state.search = "";
    },
  },
});

export const {
  productChangeCurrentPage,
  productSearch,
  productClearSearch,
  productToggleChecked,
  productClearInit,
} = productSlice.actions;
export default productSlice.reducer;
