import React from "react"
import { MdOutlineCancel } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import { Button } from "."
import { userProfileData } from "../data/dummy"
import { userLoggedOut } from "../features/auth/authSlice"
import avatar5 from "../assets/avatar5.png"
import { themeSetIsClicked } from "../features/theme/themeSlice"

const UserProfile = () => {

  const { currentColor } = useSelector((state) => state?.theme)

  const user = useSelector((state) => state?.auth?.user)

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(userLoggedOut())
    localStorage.clear()
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Perfil del usuario
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          onClick={() => dispatch(themeSetIsClicked())}
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar5}
          alt="user-profile"
        />
        <div>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {user?.isAdmin ? "Administrator" : "Personal"}{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {user?.email}{" "}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Cerrar sessión"
          borderRadius="10px"
          width="full"
          onClick={() => logout()}
        />
      </div>
    </div>
  )
}

export default UserProfile