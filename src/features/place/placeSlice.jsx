import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  placeSelected: null,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    placeChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    placeSearch: (state, action) => {
      state.search = action.payload;
    },
    placeClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
    },
    setPlaceSelected: (state, action) => {
      state.placeSelected = action.payload;
    },
  },
});

export const {
  placeChangeCurrentPage,
  placeSearch,
  placeClearSearch,
  placeClearInit,
  setPlaceSelected,
} = placeSlice.actions;
export default placeSlice.reducer;
