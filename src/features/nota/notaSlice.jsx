import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  notaItemsDelete: [],
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
      state.notaItemsDelete = [];
    },
    setNotaItems: (state, action) => {
      state.notaItems = action.payload;
    },
    setNotaAddItem: (state, action) => {
      const foundItemIndex = state.notaItems.findIndex(
        (item) => item?.producto?.id === action.payload.productoId
      );
      if (foundItemIndex == -1)
        state.notaItems = [...state.notaItems, action.payload];
      else {
        state.notaItems[foundItemIndex].amount =
          state.notaItems[foundItemIndex].amount + 1;
      }
    },
    setNotaDeleteItem: (state, action) => {
      const foundItem = state.notaItems.find(
        (item) => item?.producto?.id === action.payload
      );
      if (foundItem) {
        if (foundItem?.id != "")
          state.notaItemsDelete = [...state.notaItemsDelete, foundItem?.id];
        state.notaItems.splice(state.notaItems.indexOf(foundItem), 1);
      }
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
