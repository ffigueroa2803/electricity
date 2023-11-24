import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

import {
  Header,
  LoadingCircle,
  NotFound,
  Pagination,
  UserModal,
} from "../components";
import { useGetUsersQuery } from "../features/user/userApi";
import {
  userChangeCurrentPage,
  userClearInit,
  userSearch,
} from "../features/user/userSlice";
import { BiTrash } from "react-icons/bi";
import { state_style_color } from "../data/dummy";

export const Users = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search } = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState("");
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState({});
  const [typeAction, setTypeAction] = useState("");

  const { data, isLoading, error } = useGetUsersQuery({ page, limit, search });

  const getUserSearch = () => {
    dispatch(userChangeCurrentPage(1));
    dispatch(userSearch(dataInput));
  };

  const controlModal = (dataUser, action) => {
    setUser(dataUser);
    setTypeAction(action);
    if (action === "new" || action === "edit" || action === undefined)
      setOpened((prevState) => !prevState);
    if (action === "delete") {
      console.log("delete");
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [data, error]);

  useEffect(() => {
    dispatch(userClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="LISTA DE USUARIOS" />
      {/* Search && New */}
      <div className="flex flex-col md:flex-row justify-between w-full mb-1 sm:mb-2 ml-0 lg:ml-12">
        <div className="text-end mb-3">
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                id="form-subscribe-Filter"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent lg:w-96"
                placeholder="Ingrese correo"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <button
              onClick={() => getUserSearch()}
              style={{ backgroundColor: currentColor }}
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white rounded-lg shadow-md lg:mr-9"
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="lg:mr-12">
          <button
            style={{ backgroundColor: currentColor }}
            className="flex-shrink-0 px-4 py-2 mb-3 text-base font-semibold text-white rounded-lg shadow-md w-3/4 lg:w-20 md:w-20"
            onClick={() => controlModal({}, "new")}
          >
            Nuevo
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto w-full border-b-1 border-gray-200">
        <table className="mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden lg:table-fixed lg:w-[100%]">
          <thead style={{ background: currentColor }}>
            <tr className="text-white text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4 truncate">
                Email
              </th>

              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                {" "}
                Rol{" "}
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                {" "}
                Estado{" "}
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <LoadingCircle width="48" color={currentColor} colSpan="4" />
            ) : data?.items.length === 0 ? (
              <NotFound title="No hay datos" colSpan="4" />
            ) : (
              data?.items.map((user) => (
                <tr key={user?.id}>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4 text-center">
                    {user?.isAdmin === true ? "Administrador" : "Colaborador"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={
                        user?.state === true
                          ? state_style_color?.create
                          : state_style_color?.canceled
                      }
                    >
                      {user?.state === true ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {" "}
                    <button
                      onClick={() => controlModal(user, "edit")}
                      style={{ color: currentColor }}
                      className="text-gray-500 text-xl hover:underline mr-3"
                      title="Editar"
                    >
                      <RiPencilLine />
                    </button>
                    <button
                      onClick={() => controlModal(user, "delete")}
                      style={{ color: currentColor }}
                      className="text-gray-500 text-xl hover:underline"
                      title="Eliminar"
                    >
                      <BiTrash />
                    </button>{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isLoading ? null : (
          <Pagination
            {...data?.meta}
            changeCurrentPage={userChangeCurrentPage}
          />
        )}
      </div>
      {/* Modal */}
      <UserModal
        open={opened}
        setOpened={setOpened}
        control={controlModal}
        user={user}
        typeAction={typeAction}
        setDataInput={setDataInput}
        toast={toast}
      />
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
