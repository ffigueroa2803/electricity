import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 8,
  search: "",
  modal: false,
  measureSelected: null,
};

const measureSlice = createSlice({
  name: "measure",
  initialState,
  reducers: {
    measureChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    measureSearch: (state, action) => {
      state.search = action.payload;
    },
    measureClearInit: (state) => {
      state.page = 1;
      state.limit = 8;
      state.search = "";
    },
    setMeasureSelected: (state, action) => {
      state.measureSelected = action.payload;
    },
  },
});

export const {
  measureChangeCurrentPage,
  measureSearch,
  measureClearSearch,
  measureClearInit,
  setMeasureSelected,
} = measureSlice.actions;
export default measureSlice.reducer;
