import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { themeSetColor, themeSetMode } from "./features/theme/themeSlice";
import { RootRouter } from "./routers/RootRouter";
import "./App.css";

const App = () => {
  const { currentMode } = useSelector((state) => state?.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    const currentThemeColor = localStorage.getItem("colorMode");
    if (currentThemeMode && currentThemeColor) {
      dispatch(themeSetMode(currentThemeMode));
      dispatch(themeSetColor(currentThemeColor));
    }
  }, [dispatch]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Suspense>
        <RouterProvider router={RootRouter} />
      </Suspense>
    </div>
  );
};

export default App;
