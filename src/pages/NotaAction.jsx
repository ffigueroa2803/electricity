import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, MasterSelect } from "../components";
import { useSelector } from "react-redux";
import { RiArrowGoBackLine, RiDeleteBin2Line } from "react-icons/ri";
import Select from "react-select";
import { motivo, situation, typeDocument } from "../data/dummy";

export const NotaAction = () => {
  const navigate = useNavigate();

  const { currentColor } = useSelector((state) => state?.theme);
  const { productSelected } = useSelector((state) => state?.product);

  let { notaId } = useParams();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header title={`CREAR NOTA DE PEDIDO`} />
        <button
          type="button"
          onClick={() => navigate("/authorized/nota-pedido", { replace: true })}
          style={{ color: `${currentColor}`, borderRadius: "50%" }}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          title="Regresar a la lista"
        >
          <RiArrowGoBackLine />
        </button>
      </div>
      {/* Form */}
      <form>
        {/* Codigo - Tipo documento - Fecha */}
        <div className="flex flex-col lg:flex-row -mx-3 mb-6">
          {/* Codigo */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-lg">Codigo</label>
            <input
              id="code"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="text"
              name="code"
              placeholder="AUTOGENERADO"
              disabled
            />
          </div>
          {/* Tipo documento */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-lg">Tipo documento</label>
            <div className="relative mt-1">
              <Select isClearable isSearchable options={typeDocument} />
            </div>
          </div>
          {/* Fecha */}
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-lg">Fecha</label>
            <input
              id="fecha"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="date"
              name="fecha"
            />
          </div>
        </div>
        {/* Area Solicitante - CRP - Destino y/o Actividad */}
        <div className="flex flex-col lg:flex-row -mx-3 mb-6">
          {/* Area Solicitante */}
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-lg">Area Solicitante</label>
            <input
              id="area"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="text"
              name="area"
            />
          </div>
          {/* CRP */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-lg">CRP</label>
            <input
              id="crp"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="text"
              name="crp"
            />
          </div>
          {/* Destino y/o Actividad */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">Destino y/o Actividad</label>
            <input
              id="destino"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="text"
              name="destino"
            />
          </div>
        </div>
        {/* Situacion - Producto - Boton */}
        <div className="flex flex-col lg:flex-row -mx-3 mb-6">
          {/* Situacion */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">Situación</label>
            <div className="mt-1">
              <Select isClearable isSearchable options={situation} />
            </div>
          </div>
          {/* Lista Producto */}
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-lg">Producto</label>
            <div className="relative mt-1">
              <MasterSelect selected={productSelected} maintainer="productos" />
            </div>
          </div>
          {/* Motivo */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">Motivo</label>
            <div className="mt-1">
              <Select isClearable isSearchable options={motivo} />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto w-full border-b-1 border-gray-200">
          <table className="mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden lg:table-fixed lg:w-[100%]">
            <thead style={{ background: currentColor }}>
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4 w-[5%]">
                  Item
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 truncate">
                  Código
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[20%]">
                  Descripción del material
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                  Unidad
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                  cantidad
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">56545</td>
                <td className="px-6 py-4 truncate">Transformador Trifasico</td>
                <td className="px-6 py-4 text-center">UND</td>
                <td className="px-6 py-4 text-center">
                  <input
                    id="cantidad"
                    className="w-20 border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-center"
                    type="number"
                    name="cantidad"
                    defaultValue={1}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  {" "}
                  <button
                    onClick={() => console.log("remove")}
                    style={{ color: currentColor, borderRadius: "50%" }}
                    className="text-gray-500 text-xl hover:drop-shadow-xl hover:bg-light-gray p-2"
                    title="Eliminar producto"
                  >
                    <RiDeleteBin2Line />
                  </button>{" "}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">56545</td>
                <td className="px-6 py-4 truncate">Transformador Trifasico</td>
                <td className="px-6 py-4 text-center">UND</td>
                <td className="px-6 py-4 text-center">
                  <input
                    id="cantidad"
                    className="w-20 border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-center"
                    type="number"
                    name="cantidad"
                    defaultValue={1}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  {" "}
                  <button
                    onClick={() => console.log("remove")}
                    style={{ color: currentColor, borderRadius: "50%" }}
                    className="text-gray-500 text-xl hover:drop-shadow-xl hover:bg-light-gray p-2"
                    title="Eliminar producto"
                  >
                    <RiDeleteBin2Line />
                  </button>{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Observación */}
        <div className="flex flex-wrap -mx-3 mb-3 mt-5">
          <div className="w-full px-3">
            <label className="font-medium text-lg">Observación</label>
            <textarea
              id="observation"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              name="description"
              cols="20"
              rows="3"
            />
          </div>
        </div>
        {/* Button */}
        <div className="mt-1 flex justify-start gap-y-4">
          <button
            className="w-1/6 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold mt-0"
            style={{ backgroundColor: currentColor }}
          >
            Guardar pedido
          </button>
        </div>
      </form>
    </div>
  );
};
