import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";

import {
  Header,
  LoadingCircle,
  NotFound,
  Pagination,
  ProductModal,
} from "../components";
import { useGetProductsQuery } from "../features/product/productApi";
import {
  productChangeCurrentPage,
  productClearInit,
  productSearch,
} from "../features/product/productSlice";

export const Products = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search } = useSelector((state) => state?.product);

  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState("");
  const [opened, setOpened] = useState(false);
  const [product, setProduct] = useState({});
  const [typeAction, setTypeAction] = useState("");

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    limit,
    search,
  });

  const getProductSearch = () => {
    dispatch(productChangeCurrentPage(1));
    dispatch(productSearch(dataInput));
  };

  const controlModal = (dataProduct, acction) => {
    setProduct(dataProduct);
    setTypeAction(acction);
    setOpened((prevState) => !prevState);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [data, error]);

  useEffect(() => {
    dispatch(productClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="LISTA DE PRODUCTOS" />
      {/* Search && New */}
      <div className="flex flex-col md:flex-row justify-between w-full mb-1 sm:mb-2 ml-0 lg:ml-12">
        <div className="text-end mb-3">
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                id="form-subscribe-Filter"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent lg:w-96"
                placeholder="Ingrese producto"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <button
              onClick={() => getProductSearch()}
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
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[10%]">
                Code Mat.
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[25%]">
                Nombre
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[25%]">
                Descripcion
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Stock
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Marca
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Medida
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <LoadingCircle width="48" color={currentColor} colSpan="7" />
            ) : data?.items.length === 0 ? (
              <NotFound title="No hay datos" colSpan="7" />
            ) : (
              data?.items.map((value) => (
                <tr key={value?.id}>
                  <td className="px-6 py-4 text-center">{value?.code}</td>
                  <td className="px-6 py-4">{value?.name}</td>
                  <td className="px-6 py-4 truncate">{value?.description}</td>
                  <td className="px-6 py-4 text-center">{value?.stock}</td>
                  <td className="px-6 py-4 text-center">
                    {value?.marca?.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {value?.medida?.name}
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
          <Pagination
            {...data?.meta}
            changeCurrentPage={productChangeCurrentPage}
          />
        )}
      </div>
      {/* Modal */}
      <ProductModal
        open={opened}
        setOpened={setOpened}
        control={controlModal}
        product={product}
        typeAction={typeAction}
        setDataInput={setDataInput}
        toast={toast}
      />
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
