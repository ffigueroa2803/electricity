import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  ConfirmDialog,
  Header,
  LoadingCircle,
  NotFound,
  Pagination,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RiFileForbidLine, RiFilePdfLine, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  useAnularNotaMutation,
  useGetNotasQuery,
} from "../features/nota/notaApi";
import {
  notaChangeCurrentPage,
  notaClearInit,
  notaSearch,
} from "../features/nota/notaSlice";

const creado =
  "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded";
const anulado =
  "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded";

export const Nota = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, search } = useSelector((state) => state?.nota);

  const [dataInput, setDataInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nota, setNota] = useState({});

  const {
    data = [],
    isLoading,
    error,
  } = useGetNotasQuery({ page, limit, search });

  const [anularNota, { isLoading: isLoadingAnular, error: errorAnular }] =
    useAnularNotaMutation();

  const getNotaSearch = () => {
    dispatch(notaChangeCurrentPage(1));
    dispatch(notaSearch(dataInput));
  };

  const handleConfirm = async () => {
    try {
      const deleteNota = await anularNota(nota?.id).unwrap();
      if (deleteNota?.affected === 1) {
        setIsDialogOpen(false);
        toast.success("Anulado correctamente!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(notaClearInit());
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="LISTA DE NOTA DE PEDIDOS" />
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
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <button
              onClick={() => getNotaSearch()}
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
              navigate(`/authorized/nota-pedido/create`, {
                replace: true,
                state: { action: "create" },
              })
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
              <th className="font-semibold text-sm uppercase px-6 py-4 w-[8%]">
                Code
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 truncate">
                Fecha
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[15%]">
                Area
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Crp
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[30%]">
                Destino
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Tipo
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Situación
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                Estado
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <LoadingCircle width="48" color={currentColor} colSpan="8" />
            ) : data?.items.length === 0 ? (
              <NotFound title="No hay datos" colSpan="8" />
            ) : (
              data?.items?.map((value) => (
                <tr key={value?.id}>
                  <td className="px-6 py-4">{value?.code}</td>
                  <td className="px-6 py-4">{value?.date}</td>
                  <td className="px-6 py-4">{value?.area?.name}</td>
                  <td className="px-6 py-4 text-center">
                    {value?.documentCrp}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {value?.lugar?.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {value?.type == "ENTRY" ? "ENTRADA" : "SALIDA"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {value?.situacion?.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={value?.state === true ? creado : anulado}>
                      {value?.state === true ? "CREADO" : "ANULADO"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/authorized/nota-pedido/${value?.id}`, {
                          replace: true,
                          state: { action: "edit" },
                        })
                      }
                      style={{ color: currentColor }}
                      className="text-gray-500 text-xl hover:underline mr-2"
                      title="Editar"
                    >
                      <RiPencilLine />
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          `${import.meta.env.VITE_APP_API}/api/notas/${
                            value?.id
                          }/informe.pdf`,
                          "_blank"
                        );
                        return false;
                      }}
                      style={{ color: currentColor }}
                      className="text-gray-500 text-xl hover:underline mr-2"
                      title="Reporte"
                    >
                      <RiFilePdfLine />
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setNota(value);
                        setIsDialogOpen(true);
                      }}
                      style={{ color: currentColor }}
                      className="text-gray-500 text-xl hover:underline"
                      title="Anular Nota de pedido"
                    >
                      <RiFileForbidLine />
                    </button>{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isLoading ? (
          <div className="mb-2">Cargando paginación</div>
        ) : (
          <Pagination
            {...data?.meta}
            changeCurrentPage={notaChangeCurrentPage}
          />
        )}
      </div>
      {/* ConfirmDialog */}
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        onClose={handleCancel}
        title="Anular nota de pedido Numero"
        data={nota}
      />
      {/* Toast */}
      <Toaster position="top-center" />
    </div>
  );
};
