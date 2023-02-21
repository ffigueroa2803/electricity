import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRegisterUpdateProductMutation } from "../../features/product/productApi";

const ProductModal = ({
  open,
  setOpened,
  control,
  product,
  typeAction,
  setDataInput,
  toast,
}) => {
  const id = product?.id || null;

  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit } = useSelector((state) => state?.product);

  const dispatch = useDispatch();

  const [registerUpdateProduct, { data, isLoading, error: responseError }] =
    useRegisterUpdateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        />
        <div className="rounded w-[400px] lg:w-[900px] space-y-8 bg-white p-10 absolute top-1/3 left-1/2 z-20 -translate-x-1/2 -translate-y-1/3 overflow-auto lg:mt-0 mt-52">
          <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            {typeAction === "edit" ? "Editar" : "Nuevo"}
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Nombre del producto */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="font-medium text-lg">
                  Nombre del producto
                </label>
                <input
                  id="code"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="name"
                  required
                />
              </div>
            </div>
            {/* Codigo, Nombre, Stock */}
            <div className="flex flex-col lg:flex-row -mx-3 mb-6">
              {/* Codigo de Material */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">
                  Codigo de Material
                </label>
                <input
                  id="code"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="code"
                  required
                />
              </div>
              {/* Name */}
              <div className="w-full md:w-1/2 px-3">
                <label className="font-medium text-lg">
                  Codigo Patrimonial
                </label>
                <input
                  id="codepa"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="codepa"
                  required
                />
              </div>
              {/* Stock */}
              <div class="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
                <label className="font-medium text-lg">Stock</label>
                <input
                  id="stock"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="stock"
                  required
                />
              </div>
            </div>
            {/* Serie, Potencia, Año */}
            <div className="flex flex-col lg:flex-row -mx-3 mb-6">
              {/* Code */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">Serie</label>
                <input
                  id="serie"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="serie"
                  required
                />
              </div>
              {/* Potencia */}
              <div className="w-full md:w-1/2 px-3">
                <label className="font-medium text-lg">Potencia</label>
                <input
                  id="potencia"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="potencia"
                  required
                />
              </div>
              {/* Año */}
              <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
                <label className="font-medium text-lg">Año</label>
                <input
                  id="anio"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="anio"
                  required
                />
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="font-medium text-lg">Descripción</label>
                <textarea
                  id="description"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  name="description"
                  cols="20"
                  rows="5"
                  required
                />
              </div>
            </div>
            {/* DropdownList */}
            <div className="flex flex-row -mx-3 mb-6">
              {/* Marca */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">Marca</label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    id="grid-state"
                  >
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Medida */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">Medida</label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    id="grid-state"
                  >
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Button */}
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold mt-8"
                disabled={isLoading}
                style={{ backgroundColor: currentColor }}
              >
                {isLoading ? "...Procesando" : "Guardar datos"}
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default ProductModal;
