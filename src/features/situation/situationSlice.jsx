import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  situationSelected: null,
  toggle: { state: false },
};

const situationSlice = createSlice({
  name: "situation",
  initialState,
  reducers: {
    situationChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    situationSearch: (state, action) => {
      state.search = action.payload;
    },
    situationToggleChecked: (state, action) => {
      state.toggle = {
        ...state.toggle,
        [action.payload.type]: action.payload.value,
      };
    },
    situationClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.situationSelected = "";
      state.toggle = {
        state: false,
      };
    },
    setSituationSelected: (state, action) => {
      state.situationSelected = action.payload;
    },
  },
});

export const {
  situationChangeCurrentPage,
  situationSearch,
  situationToggleChecked,
  situationClearInit,
  setSituationSelected,
} = situationSlice.actions;
export default situationSlice.reducer;
