import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { Header, Modal, Table } from "../components";
import {
  useGetPlacesQuery,
  useRegisterUpdatePlaceMutation,
} from "../features/place/placeApi";
import {
  placeChangeCurrentPage,
  placeClearInit,
  placeSearch,
} from "../features/place/placeSlice";

const Places = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search } = useSelector((state) => state?.area);

  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState("");
  const [opened, setOpened] = useState(false);
  const [place, setPlace] = useState({});
  const [typeAction, setTypeAction] = useState("");

  const { data, isLoading, error } = useGetPlacesQuery({ page, limit, search });

  const getPlaceSearch = () => {
    dispatch(placeChangeCurrentPage(1));
    dispatch(placeSearch(dataInput));
  };

  const controlModal = (dataPlace, acction) => {
    setPlace(dataPlace);
    setTypeAction(acction);
    setOpened((prevState) => !prevState);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [data, error]);

  useEffect(() => {
    dispatch(placeClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="Lugares" />
      {/* Search && New */}
      <div className="flex flex-col md:flex-row justify-between w-full mb-1 sm:mb-2 ml-0 lg:ml-12">
        <div className="text-end mb-3">
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                id='"form-subscribe-Filter'
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent lg:w-96"
                placeholder="Ingrese descripcion"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <button
              onClick={() => getPlaceSearch()}
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
            className="flex-shrink-0 px-4 py-2 mb-3 text-base font-semibold text-white rounded-lg shadow-md w-3/4 lg:w-20"
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
        changeCurrentPage={placeChangeCurrentPage}
      />
      {/* Modal */}
      <Modal
        open={opened}
        setOpened={setOpened}
        control={controlModal}
        items={place}
        typeAction={typeAction}
        setDataInput={setDataInput}
        title="Lugar"
        mutation={useRegisterUpdatePlaceMutation}
        clearInit={placeClearInit}
        toast={toast}
      />
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Places;
