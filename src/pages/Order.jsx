import React from "react";
import { Header } from "../components";
import { useSelector } from "react-redux";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const Order = () => {
  const navigate = useNavigate();
  const { currentColor } = useSelector((state) => state?.theme);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="Nota de pedido" />
      {/* Search && New */}
      <div className="flex flex-col md:flex-row justify-between w-full mb-1 sm:mb-2 ml-0 lg:ml-12">
        <div className="text-end mb-3">
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                id="form-subscribe-Filter"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent lg:w-96"
                placeholder="Ingrese nota de pedido"
                // value={dataInput}
                // onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <button
              // onClick={}
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
            onClick={() =>
              navigate("/authorized/nota-pedido/create", { replace: true })
            }
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
              <th className="font-semibold text-sm uppercase px-6 py-4 w-[20%]">
                Code
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 truncate">
                Fecha
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Area
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Crp
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Destino
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Situación
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">0017578</td>
              <td className="px-6 py-4">03-09-2022</td>
              <td className="px-6 py-4 truncate">Distribución</td>
              <td className="px-6 py-4 text-center">101913000</td>
              <td className="px-6 py-4 text-center">SE 788 los tuneles</td>
              <td className="px-6 py-4 text-center">Recuperado</td>
              <td className="px-6 py-4 text-center">
                {" "}
                <button
                  onClick={() => console.log("edit")}
                  style={{ color: currentColor }}
                  className="text-gray-500 text-xl hover:underline"
                >
                  <RiPencilLine />
                </button>{" "}
                <button
                  onClick={() => console.log("remove")}
                  style={{ color: currentColor }}
                  className="text-gray-500 text-xl hover:underline ml-3"
                >
                  <RiDeleteBin2Line />
                </button>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
