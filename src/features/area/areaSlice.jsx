import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 8,
  search: "",
  modal: false,
  areaSelected: null,
};

const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    areaChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    areaSearch: (state, action) => {
      state.search = action.payload;
    },
    areaClearInit: (state) => {
      state.page = 1;
      state.limit = 8;
      state.search = "";
    },
    setAreaSelected: (state, action) => {
      state.areaSelected = action.payload;
    },
  },
});

export const {
  areaChangeCurrentPage,
  areaSearch,
  areaClearSearch,
  areaClearInit,
  setAreaSelected,
} = areaSlice.actions;
export default areaSlice.reducer;
