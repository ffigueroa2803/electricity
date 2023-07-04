import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  notaItems: [],
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
    setNotaItems: (state, action) => {
      state.notaItems = action.payload;
    },
    setNotaAddItem: (state, action) => {
      state.notaItems = [...state.notaItems, action.payload];
    },
    setNotaDeleteItem: (state, action) => {
      console.log(action.payload);
      const foundItem = state.notaItems.find(
        (item) => item.id === action.payload
      );
      if (foundItem) {
        state.notaItems.splice(state.notaItems.indexOf(foundItem), 1);
      }
    },
  },
});

export const {
  notaChangeCurrentPage,
  notaSearch,
  notaClearSearch,
  notaToggleChecked,
  notaClearInit,
  setNotaItems,
  setNotaAddItem,
  setNotaDeleteItem,
} = notaSlice.actions;
export default notaSlice.reducer;
