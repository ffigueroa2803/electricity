import React from "react";
import { useSelector } from "react-redux";

import { LoadingCircle, NotFound, Pagination } from "../components";
import { RiPencilLine } from "react-icons/ri";
import moment from "moment/moment";

const Table = ({ data, isLoading, controlModal, changeCurrentPage }) => {
  const { currentColor } = useSelector((state) => state?.theme);

  return (
    <>
      <div className="overflow-x-auto w-full border-b-1 border-gray-200">
        <table className="mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden lg:table-fixed lg:w-[100%]">
          <thead style={{ background: currentColor }}>
            <tr className="text-white text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4 w-[20%]">
                Id
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 w-[25%]">
                Nombre
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[15%]">
                Descripcion
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                F. Creacion
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                F. Actualizacion
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <LoadingCircle width="48" color={currentColor} colSpan="6" />
            ) : data?.items.length === 0 ? (
              <NotFound title="No hay datos" colSpan="6" />
            ) : (
              data?.items.map((value) => (
                <tr key={value?.id}>
                  <td className="px-6 py-4 truncate">{value?.id}</td>
                  <td className="px-6 py-4 truncate">{value?.name}</td>
                  <td className="px-6 py-4 truncate">{value?.description}</td>
                  <td className="px-6 py-4 text-center">
                    {moment(value?.createdAt).format("DD/MM/YYYY h:mm:ss a")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {moment(value?.updatedAt).format("DD/MM/YYYY h:mm:ss a")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {" "}
                    <button
                      onClick={() => controlModal(value, "edit")}
                      style={{ color: currentColor }}
                      className="text-gray-500 text-xl hover:underline"
                      title="Editar"
                    >
                      <RiPencilLine />
                    </button>{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isLoading ? null : (
          <Pagination {...data?.meta} changeCurrentPage={changeCurrentPage} />
        )}
      </div>
    </>
  );
};

export default Table;
