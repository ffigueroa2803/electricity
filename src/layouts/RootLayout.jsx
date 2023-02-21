import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiSettings } from "react-icons/fi";
import { themeSetThemeSettings } from "../features/theme/themeSlice";
import { Footer, Navbar, Sidebar, ThemeSettings } from "../components";

const RootLayout = () => {
  const { currentColor, themeSettings, activeMenu } = useSelector(
    (state) => state?.theme
  );

  const dispatch = useDispatch();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <button
          type="button"
          onClick={() => dispatch(themeSetThemeSettings(true))}
          style={{ background: currentColor, borderRadius: "50%" }}
          className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <FiSettings />
        </button>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2"
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div>
          {themeSettings && <ThemeSettings />}

          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
