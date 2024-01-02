import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  placeSelected: null,
  toggle: { state: false },
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
    placeToggleChecked: (state, action) => {
      state.toggle = {
        ...state.toggle,
        [action.payload.type]: action.payload.value,
      };
    },
    placeClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.placeSelected = null;
      state.toggle = {
        state: false,
      };
    },
    setPlaceSelected: (state, action) => {
      state.placeSelected = action.payload;
    },
  },
});

export const {
  placeChangeCurrentPage,
  placeSearch,
  placeToggleChecked,
  placeClearInit,
  setPlaceSelected,
} = placeSlice.actions;
export default placeSlice.reducer;
