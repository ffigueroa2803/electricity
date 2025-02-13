import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenSize: undefined,
  currentMode: "Dark",
  currentColor: "#7352FF",
  themeSettings: false,
  activeMenu: true,
  isClicked: {
    userProfile: false,
    notification: false,
  },
  avatar: "avatar1",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeSetScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    themeSetMode: (state, action) => {
      state.currentMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    themeSetColor: (state, action) => {
      state.currentColor = action.payload;
      localStorage.setItem("colorMode", action.payload);
    },
    themeSetThemeSettings: (state, action) => {
      state.themeSettings = action.payload;
    },
    themeSetActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    themeSetIsClicked: (state) => {
      state.isClicked = {
        userProfile: false,
        notification: false,
      };
    },
    themeHandleClick: (state, action) => {
      state.isClicked = { ...state.isClicked, [action.payload]: true };
    },
    themeSetAvatar: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem("avatarMode", action.payload);
    },
  },
});

export const {
  themeSetScreenSize,
  themeSetMode,
  themeSetColor,
  themeSetThemeSettings,
  themeSetActiveMenu,
  themeSetIsClicked,
  themeHandleClick,
  themeSetAvatar,
} = themeSlice.actions;
export default themeSlice.reducer;
