import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  areaSelected: null,
  toggle: { state: false },
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
    areaToggleChecked: (state, action) => {
      state.toggle = {
        ...state.toggle,
        [action.payload.type]: action.payload.value,
      };
    },
    areaClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.areaSelected = null;
      state.toggle = {
        state: false,
      };
    },
    setAreaSelected: (state, action) => {
      state.areaSelected = action.payload;
    },
  },
});

export const {
  areaChangeCurrentPage,
  areaSearch,
  areaToggleChecked,
  areaClearInit,
  setAreaSelected,
} = areaSlice.actions;
export default areaSlice.reducer;
