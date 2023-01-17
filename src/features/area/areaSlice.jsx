import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  page: 1,
  limit: 8,
  search: "",
  modal: false
}

const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    areaChangeCurrentPage: (state, action) => {
      state.page = action.payload
    },
    areaSearch: (state, action) => {
      state.search = action.payload
    },
    areaClearInit: (state) => {
      state.page = 1;
      state.limit = 8;
      state.search = ""
    },
  },
})

export const { areaChangeCurrentPage, areaSearch, areaClearSearch, areaClearInit } = areaSlice.actions
export default areaSlice.reducer