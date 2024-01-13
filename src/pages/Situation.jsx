import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  situationChangeCurrentPage,
  situationClearInit,
  situationSearch,
  situationToggleChecked,
} from "../features/situation/situationSlice";
import {
  useRegisterUpdateSituationMutation,
  useGetSituationsQuery,
  useDeleteSituationMutation,
} from "../features/situation/situationApi";
import { ConfirmDialog, Header, Modal, Table } from "../components";
import toast, { Toaster } from "react-hot-toast";

export const Situation = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search, toggle } = useSelector(
    (state) => state?.situation
  );

  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState("");
  const [opened, setOpened] = useState(false);
  const [situation, setSituation] = useState({});
  const [typeAction, setTypeAction] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetSituationsQuery(
    { page, limit, search },
    { refetchOnMountOrArgChange: true }
  );

  const [
    deleteSituation,
    { isLoading: isLoadingSituation, error: errorSituation },
  ] = useDeleteSituationMutation();

  const getSituationSearch = () => {
    dispatch(situationChangeCurrentPage(1));
    dispatch(situationSearch(dataInput));
  };

  const controlModal = (dataSituation, action) => {
    setSituation(dataSituation);
    setTypeAction(action);
    if (action === "new" || action === "edit" || action === undefined)
      setOpened((prevState) => !prevState);
    if (action === "delete") {
      setIsDialogOpen(true);
    }
  };

  const handleConfirm = async () => {
    try {
      let result = await deleteSituation(situation?.id).unwrap();
      if (result?.status === 501) {
        toast.error(result?.message || errorSituation);
        return;
      }
      toast.success(result?.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error || errorSituation);
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
    dispatch(situationClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="LISTA DE SITUACIONES" />
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
              onClick={() => getSituationSearch()}
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
        changeCurrentPage={situationChangeCurrentPage}
      />
      {/* Modal */}
      <Modal
        open={opened}
        setOpened={setOpened}
        control={controlModal}
        items={situation}
        typeAction={typeAction}
        setDataInput={setDataInput}
        title="Situacion"
        mutation={useRegisterUpdateSituationMutation}
        clearInit={situationClearInit}
        toast={toast}
        toggle={toggle}
        toggleChecked={situationToggleChecked}
      />
      {/* ConfirmDialog */}
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        onClose={handleCancel}
        title="Estas seguro de eliminar o desactivar"
        data={null}
        loading={isLoadingSituation}
        prefix="la situacion de nombre "
        result={situation}
      />
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
