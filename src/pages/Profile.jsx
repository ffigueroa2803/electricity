import React, { useEffect, useState } from "react";

import { Header } from "../components";
import { useSelector } from "react-redux";
import Avatar from "../assets/avatar5.png";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";

export const Profile = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  // const { data: user, isLoadingUser, errorUser } = useProfileQuery();
  const user = useSelector((state) => state?.auth?.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [updateProfile, { data, isLoading, error }] =
    useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ ...user, password: password });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (user) setEmail(user?.email);
  }, [user]);

  useEffect(() => {
    if (error) toast.error("Error consultar con informática");
    else if (data) toast.success("Contraseña cambiado correctamente!");
  }, [data, error]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="MI PERFIL" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          {/* Avatar */}
          <div className="group/avatar bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-100 h-full lg:mr-1 lg:w-52 lg:h-[345px]">
            <div className="flex relative items-center justify-center z-0 rounded-[50%] w-[150px] h-[150px] ml-12 group-hover/avatar:cursor-pointer lg:w-[100%] lg:h-[50%] lg:ml-0">
              <div className="group/image">
                <img src={Avatar} className="rounded-full" />
              </div>
            </div>
            <div className="mt-4 items-center">
              Allowed *.jpeg, *.jpg, *.png, *.gif
            </div>
          </div>
          {/* Update data */}
          <div className="bg-gray-50 mt-2 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-80 md:w-760 lg:mt-0">
            <div className="flex flex-col">
              <div className="w-full px-3 mb-6 md:mb-8">
                <label className="font-medium text-lg">Correo</label>
                <input
                  id="email"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electronico"
                  disabled
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-8">
                <label className="font-medium text-lg">
                  Cambiar contraseña
                </label>
                <input
                  id="password_actual"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="password"
                  name="password_actual"
                  placeholder="Ingrese contraseña nueva"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end w-full px-3 mb-6 md:mb-8">
                <button
                  type="submit"
                  className="w-[200px] active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold mt-0"
                  style={{ backgroundColor: currentColor }}
                >
                  {isLoading ? "...Procesando" : "Guardar datos"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Toast */}
      <Toaster position="top-center" />
    </div>
  );
};
