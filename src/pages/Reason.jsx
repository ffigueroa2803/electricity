import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reasonChangeCurrentPage,
  reasonClearInit,
  reasonSearch,
  reasonToggleChecked,
} from "../features/reason/reasonSlice";
import {
  useRegisterUpdateReasonMutation,
  useGetReasonsQuery,
  useDeleteReasonMutation,
} from "../features/reason/reasonApi";
import { ConfirmDialog, Header, Modal, Table } from "../components";
import toast, { Toaster } from "react-hot-toast";

export const Reason = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search, toggle } = useSelector((state) => state?.reason);

  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState("");
  const [opened, setOpened] = useState(false);
  const [reason, setReason] = useState({});
  const [typeAction, setTypeAction] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetReasonsQuery(
    { page, limit, search },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteReason, { isLoading: isLoadingReason, error: errorReason }] =
    useDeleteReasonMutation();

  const getReasonSearch = () => {
    dispatch(reasonChangeCurrentPage(1));
    dispatch(reasonSearch(dataInput));
  };

  const controlModal = (dataReason, action) => {
    setReason(dataReason);
    setTypeAction(action);
    if (action === "new" || action === "edit" || action === undefined)
      setOpened((prevState) => !prevState);
    if (action === "delete") {
      setIsDialogOpen(true);
    }
  };

  const handleConfirm = async () => {
    try {
      let result = await deleteReason(reason?.id).unwrap();
      if (result?.status === 501) {
        toast.error(result?.message || errorReason);
        return;
      }
      toast.success(result?.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error || errorReason);
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
    dispatch(reasonClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="LISTA DE MOTIVOS" />
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
              onClick={() => getReasonSearch()}
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
        changeCurrentPage={reasonChangeCurrentPage}
      />
      {/* Modal */}
      <Modal
        open={opened}
        setOpened={setOpened}
        control={controlModal}
        items={reason}
        typeAction={typeAction}
        setDataInput={setDataInput}
        title="Motivo"
        mutation={useRegisterUpdateReasonMutation}
        clearInit={reasonClearInit}
        toast={toast}
        toggle={toggle}
        toggleChecked={reasonToggleChecked}
      />
      {/* ConfirmDialog */}
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        onClose={handleCancel}
        title="Estas seguro de eliminar o desactivar"
        data={null}
        loading={isLoadingReason}
        prefix="el motivo "
        result={reason}
      />
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
