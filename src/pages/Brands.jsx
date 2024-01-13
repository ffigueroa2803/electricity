import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { ConfirmDialog, Header, Modal, Table } from "../components";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useRegisterUpdateBrandMutation,
} from "../features/brand/brandApi";
import {
  brandChangeCurrentPage,
  brandClearInit,
  brandSearch,
  brandToggleChecked,
} from "../features/brand/brandSlice";

export const Brands = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search, toggle } = useSelector((state) => state?.brand);

  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState("");
  const [opened, setOpened] = useState(false);
  const [brand, setBrand] = useState({});
  const [typeAction, setTypeAction] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetBrandsQuery({ page, limit, search });

  const [
    deleteBrand,
    { data: dataBrand, isLoading: isLoadingBrand, error: errorBrand },
  ] = useDeleteBrandMutation();

  const getBrandSearch = () => {
    dispatch(brandChangeCurrentPage(1));
    dispatch(brandSearch(dataInput));
  };

  const controlModal = (dataBrand, action) => {
    try {
      setBrand(dataBrand);
      setTypeAction(action);
      if (action === "new" || action === "edit" || action === undefined)
        setOpened((prevState) => !prevState);
      if (action === "delete") {
        setIsDialogOpen(true);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleConfirm = async () => {
    try {
      let result = await deleteBrand(brand?.id).unwrap();
      if (result?.status === 501) {
        toast.error(result?.message);
        return;
      }
      toast.success(result?.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error);
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [data, error]);

  useEffect(() => {
    dispatch(brandClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="LISTA DE MARCAS" />
      {/* Search && New */}
      <div className="flex flex-col md:flex-row justify-between w-full mb-1 sm:mb-2 ml-0 lg:ml-12">
        <div className="text-end mb-3">
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                id="form-subscribe-Filter"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent lg:w-96"
                placeholder="Ingrese descripcion"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <button
              onClick={() => getBrandSearch()}
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
      <Table
        data={data}
        isLoading={isLoading}
        controlModal={controlModal}
        changeCurrentPage={brandChangeCurrentPage}
      />
      {/* Modal */}
      <Modal
        open={opened}
        setOpened={setOpened}
        control={controlModal}
        items={brand}
        typeAction={typeAction}
        setDataInput={setDataInput}
        title="Marca"
        mutation={useRegisterUpdateBrandMutation}
        clearInit={brandClearInit}
        toast={toast}
        toggle={toggle}
        toggleChecked={brandToggleChecked}
      />
      {/* ConfirmDialog */}
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        onClose={handleCancel}
        title="Estas seguro de eliminar o desactivar"
        data={null}
        loading={isLoadingBrand}
        prefix="la marca "
        result={brand}
      />
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
