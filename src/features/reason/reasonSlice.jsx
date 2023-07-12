import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  reasonSelected: null,
};

const reasonSlice = createSlice({
  name: "reason",
  initialState,
  reducers: {
    reasonChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    reasonSearch: (state, action) => {
      state.search = action.payload;
    },
    reasonClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.reasonSelected = "";
    },
    setReasonSelected: (state, action) => {
      state.reasonSelected = action.payload;
    },
  },
});

export const {
  reasonChangeCurrentPage,
  reasonSearch,
  reasonClearSearch,
  reasonClearInit,
  setReasonSelected,
} = reasonSlice.actions;
export default reasonSlice.reducer;
