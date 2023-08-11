import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import avatar5 from "../assets/avatar5.png";
import { Notification, UserProfile } from ".";
import { useProfileQuery } from "../features/auth/authApi";
import {
  themeSetScreenSize,
  themeSetActiveMenu,
  themeHandleClick,
  themeSetIsClicked,
} from "../features/theme/themeSlice";
import { userProfile } from "../features/auth/authSlice";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 mr-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const { screenSize, currentColor, activeMenu, isClicked } = useSelector(
    (state) => state?.theme
  );

  const dispatch = useDispatch();

  const { data, isLoading, error } = useProfileQuery();

  const handleActiveMenu = () => dispatch(themeSetActiveMenu(!activeMenu));

  useEffect(() => {
    const handleResize = () => dispatch(themeSetScreenSize(window.innerWidth));
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(themeSetActiveMenu(false));
    } else {
      dispatch(themeSetActiveMenu(true));
    }
  }, [screenSize, dispatch]);

  useEffect(() => {
    if (data) dispatch(userProfile({ user: data }));
  }, [data]);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {isLoading ? (
          <p>cargando...</p>
        ) : (
          <>
            <NavButton
              title="Notification"
              dotColor="rgb(254, 201, 15)"
              customFunc={() => {
                dispatch(themeSetIsClicked());
                dispatch(themeHandleClick("notification"));
              }}
              color={currentColor}
              icon={<RiNotification3Line />}
            />
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => {
                dispatch(themeSetIsClicked());
                dispatch(themeHandleClick("userProfile"));
              }}
            >
              <img
                className="rounded-full w-8 h-8"
                src={avatar5}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">Hola,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {data?.email}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </>
        )}

        {isClicked?.notification && <Notification />}
        {isClicked?.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
