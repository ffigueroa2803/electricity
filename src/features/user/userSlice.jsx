import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 7,
  search: "",
  modal: false,
  toggle: {
    state: false,
    isAdmin: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    userSearch: (state, action) => {
      state.search = action.payload;
    },
    userToggleChecked: (state, action) => {
      state.toggle = {
        ...state.toggle,
        [action.payload.type]: action.payload.value,
      };
    },
    userClearInit: (state) => {
      state.page = 1;
      state.limit = 7;
      state.search = "";
      state.toggle = {
        state: false,
        isAdmin: false,
      };
    },
  },
});

export const {
  userChangeCurrentPage,
  userSearch,
  userClearSearch,
  userToggleChecked,
  userClearInit,
} = userSlice.actions;
export default userSlice.reducer;
