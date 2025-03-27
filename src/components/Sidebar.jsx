import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/Logo_de_Electro_Ucayali.svg";
import { links, links_collaborator } from "../data/dummy";
import { themeSetActiveMenu } from "../features/theme/themeSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const [data, setData] = useState([]);
  const { screenSize, currentColor, activeMenu } = useSelector(
    (state) => state?.theme
  );
  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  const handleCloseSideBar = (e) => {
    if (activeMenu !== undefined && screenSize <= 900) {
      dispatch(themeSetActiveMenu(false));
    }
  };

  const hnadleSidebarUser = () => {
    if (user === undefined) return <div>Cargando....</div>;
  };

  useEffect(() => {
    if (user !== undefined) {
      const resp = user?.isAdmin === false ? links_collaborator : links;
      setData(resp);
    }
  }, [user]);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center md:items-center md:justify-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 mr-6"
            >
              <img
                className="object-contain items-center"
                src={logo}
                alt="electro"
                width="351px"
                height="180px"
              />
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => dispatch(themeSetActiveMenu(!activeMenu))}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 mr-2 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {user === undefined ? (
              <SidebarSkeleton />
            ) : (
              data.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/authorized/${link.route}`}
                      key={link.route}
                      onClick={(e) => handleCloseSideBar(e)}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
