import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.removeItem("auth");
    },
    userProfile: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userProfile } = authSlice.actions;
export default authSlice.reducer;
