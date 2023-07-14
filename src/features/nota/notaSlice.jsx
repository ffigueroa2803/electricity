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
      state.notaItems = [];
    },
    setNotaItems: (state, action) => {
      state.notaItems = action.payload;
    },
    setNotaAddItem: (state, action) => {
      state.notaItems = [...state.notaItems, action.payload];
    },
    setNotaDeleteItem: (state, action) => {
      console.log("antes : " + JSON.stringify(state.notaItems));
      const foundItem = state.notaItems.find(
        (item) => item?.producto?.id === action.payload
      );
      if (foundItem) {
        state.notaItems.splice(state.notaItems.indexOf(foundItem), 1);
      }
      console.log(JSON.stringify(state.notaItems));
    },
    setNotaEditItemAmount: (state, action) => {
      const foundItemIndex = state.notaItems.findIndex(
        (item) => item?.producto?.id === action.payload.id
      );
      state.notaItems[foundItemIndex].amount = action.payload.amount;
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
  setNotaEditItemAmount,
} = notaSlice.actions;
export default notaSlice.reducer;
