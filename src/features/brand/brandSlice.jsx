import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  brandSelected: null,
  toggle: { state: false },
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
    brandToggleChecked: (state, action) => {
      state.toggle = {
        ...state.toggle,
        [action.payload.type]: action.payload.value,
      };
    },
    brandClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.toggle = {
        state: false,
      };
    },
    setBrandSelected: (state, action) => {
      state.brandSelected = action.payload;
    },
  },
});

export const {
  brandChangeCurrentPage,
  brandSearch,
  brandToggleChecked,
  brandClearInit,
  setBrandSelected,
} = brandSlice.actions;
export default brandSlice.reducer;
