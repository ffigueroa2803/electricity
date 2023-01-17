import React from "react"
import { Outlet } from "react-router-dom"

import LogoImage from "../assets/inicio.png"

const PublicLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <img width="765px" height="482px" src={LogoImage} className="" alt="" />
      </div>
      <div className="w-full flex items-center justify-center bg-gray-50 lg:w-1/2">
        <Outlet />
      </div>
    </div>
  )
}

export default PublicLayout