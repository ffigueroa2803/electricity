import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  notaSelected: null,
};

const notaSlice = createSlice({
  name: "nota",
  initialState,
  reducers: {
    notaChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    notaSearch: (state, action) => {
      state.search = action.payload;
    },
    notaClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
    },
    setNotaSelected: (state, action) => {
      state.notaSelected = action.payload;
    },
  },
});

export const {
  notaChangeCurrentPage,
  notaSearch,
  notaClearSearch,
  notaToggleChecked,
  notaClearInit,
  setNotaSelected,
} = notaSlice.actions;
export default notaSlice.reducer;
