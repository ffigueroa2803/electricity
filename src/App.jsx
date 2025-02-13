import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import {
  themeSetAvatar,
  themeSetColor,
  themeSetMode,
} from "./features/theme/themeSlice";
import { RootRouter } from "./routers/RootRouter";
import "./App.css";

const App = () => {
  const { currentMode } = useSelector((state) => state?.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeAvatar = localStorage.getItem("avatarMode");
    if (currentThemeMode && currentThemeColor && currentThemeAvatar) {
      dispatch(themeSetMode(currentThemeMode));
      dispatch(themeSetColor(currentThemeColor));
      dispatch(themeSetAvatar(currentThemeAvatar));
    }
  }, [dispatch]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <RouterProvider router={RootRouter} />
    </div>
  );
};

export default App;
