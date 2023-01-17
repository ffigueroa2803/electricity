import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  page: 1,
  limit: 8,
  search: "",
  modal: false
}

const measureSlice = createSlice({
  name: "measure",
  initialState,
  reducers: {
    measureChangeCurrentPage: (state, action) => {
      state.page = action.payload
    },
    measureSearch: (state, action) => {
      state.search = action.payload
    },
    measureClearInit: (state) => {
      state.page = 1;
      state.limit = 8;
      state.search = ""
    },
  },
})

export const { measureChangeCurrentPage, measureSearch, measureClearSearch, measureClearInit } = measureSlice.actions
export default measureSlice.reducer