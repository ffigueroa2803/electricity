import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import LogoImage from "../assets/inicio.png";
import { useAuth } from "../hooks/useAuth";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { LoadingPage } from "../components";

export const PublicLayout = () => {
  const isLoggedIn = useAuth();
  const authChecked = useAuthCheck();

  if (!authChecked) {
    return <LoadingPage />;
  }

  if (isLoggedIn) {
    return <Navigate to="/authorized/profile" />;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <img width="765px" height="482px" src={LogoImage} className="" alt="" />
      </div>
      <div className="w-full flex items-center justify-center bg-gray-50 lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};
