import React from "react";

import { Header } from "../components";

export const Profile = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="MI PERFIL" />
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        {/* Avatar */}
        <div className="group/avatar bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl lg:mr-1 lg:w-52">
          <div className="bg-slate-50 flex relative items-center justify-center z-0 rounded-[50%] w-[100%] h-[50%] group-hover/avatar:cursor-pointer">
            <div className="group/image">image</div>
          </div>
          <div className="mt-4 items-center">
            Allowed *.jpeg, *.jpg, *.png, *.gif
          </div>
        </div>
        {/* Update data */}
        <div className="bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex flex-col">
            <div className="w-full px-3 mb-6 md:mb-8">
              <label className="font-medium text-lg">Correo</label>
              <input
                id="email"
                className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                type="text"
                name="email"
                placeholder="Correo electronico"
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-8">
              <label className="font-medium text-lg">Contraseña actual</label>
              <input
                id="password_actual"
                className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                type="text"
                name="password_actual"
                placeholder="Correo electronico"
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-8">
              <label className="font-medium text-lg">Cambiar contraseña</label>
              <input
                id="password_new"
                className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                type="text"
                name="password_new"
                placeholder="Correo electronico"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
