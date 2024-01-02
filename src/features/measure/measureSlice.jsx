import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  measureSelected: null,
  toggle: { state: false },
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
    measureToggleChecked: (state, action) => {
      state.toggle = {
        ...state.toggle,
        [action.payload.type]: action.payload.value,
      };
    },
    measureClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.toggle = {
        state: false,
      };
    },
    setMeasureSelected: (state, action) => {
      state.measureSelected = action.payload;
    },
  },
});

export const {
  measureChangeCurrentPage,
  measureSearch,
  measureToggleChecked,
  measureClearInit,
  setMeasureSelected,
} = measureSlice.actions;
export default measureSlice.reducer;
