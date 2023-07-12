import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  productSelected: null,
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
      state.limit = 7;
      state.search = "";
      state.productSelected = "";
    },
    setProductSelected: (state, action) => {
      state.productSelected = action.payload;
    },
  },
});

export const {
  productChangeCurrentPage,
  productSearch,
  productClearSearch,
  productToggleChecked,
  productClearInit,
  setProductSelected,
} = productSlice.actions;
export default productSlice.reducer;
