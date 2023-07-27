import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Header,
  MasterSelect,
  NotaTable,
  ObervationModal,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  RiArrowGoBackLine,
  RiAddLine,
  RiDiscussLine,
  RiDiscussFill,
} from "react-icons/ri";
import Select from "react-select";
import { typeDocument } from "../data/dummy";
import {
  notaClearInit,
  setNotaAddItem,
  setNotaItems,
} from "../features/nota/notaSlice";
import {
  useDeleteItemNotaMutation,
  useGetNotaIdItemsQuery,
  useRegisterItemNotaMutation,
  useRegisterUpdateNotaMutation,
} from "../features/nota/notaApi";
import { areaClearInit, setAreaSelected } from "../features/area/areaSlice";
import { placeClearInit, setPlaceSelected } from "../features/place/placeSlice";
import {
  setSituationSelected,
  situationClearInit,
} from "../features/situation/situationSlice";
import {
  reasonClearInit,
  setReasonSelected,
} from "../features/reason/reasonSlice";
import { productClearInit } from "../features/product/productSlice";

export const NotaAction = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { action } = location?.state;

  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit } = useSelector((state) => state?.nota);
  const { productSelected } = useSelector((state) => state?.product);
  const { areaSelected } = useSelector((state) => state?.area);
  const { placeSelected } = useSelector((state) => state?.place);
  const { reasonSelected } = useSelector((state) => state?.reason);
  const { situationSelected } = useSelector((state) => state?.situation);
  const { notaItems } = useSelector((state) => state?.nota);
  const { notaItemsDelete } = useSelector((state) => state?.nota);

  const [code, setCode] = useState("");
  const [typeSelected, setTypeSelected] = useState({
    value: "",
    label: "Select...",
    name: "",
  });
  const [date, setDate] = useState("");
  const [crp, setCRP] = useState("");
  const [observation, setObservation] = useState("");
  const [opened, setOpened] = useState(false);

  const {
    data: dataHeader,
    isLoading: isLoadingHeader,
    error: responseErrorHeader,
  } = useGetNotaIdItemsQuery(
    { typeAction: "header", id: id },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: dataItems,
    isLoading: isLoadingItems,
    error: responseErrorItems,
  } = useGetNotaIdItemsQuery(
    { typeAction: "items", id: id },
    { refetchOnMountOrArgChange: true }
  );

  const [registerUpdateNota, { data, isLoading, error: responseError }] =
    useRegisterUpdateNotaMutation();

  const [registerItemNota, { data: dataAddItem }] =
    useRegisterItemNotaMutation();

  const [deleteItemNota, { data: dataDeleteItem }] =
    useDeleteItemNotaMutation();

  const handleChange = (selectedOption) => {
    setTypeSelected(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newNotaItemEdit = [];
    let insertItemEdit = [];

    if (action == "edit") {
      try {
        if (notaItemsDelete.length !== 0) {
          notaItemsDelete.forEach(async (id) => await deleteItemNota(id));
        }

        newNotaItemEdit = notaItems.filter((item) => item?.id != "");
        insertItemEdit = notaItems.filter((item) => item?.id == "");

        insertItemEdit.map(
          async (item, index) =>
            await registerItemNota({
              id,
              amount: parseInt(item?.amount),
              productoId: `${item?.productoId}`,
            })
        );
      } catch (error) {
        toast.error(error);
      }
    }

    try {
      await registerUpdateNota({
        id: id,
        date,
        documentCrp: crp,
        type: typeSelected?.value,
        observation: observation,
        areaId: `${areaSelected?.id}`,
        lugarId: `${placeSelected?.id}`,
        motivoId: `${reasonSelected?.id}`,
        situacionId: `${situationSelected?.id}`,
        items: action == "edit" ? newNotaItemEdit : notaItems,
        page,
        limit,
        typeAction: action,
      });
      navigate(`/authorized/nota-pedido`, { replace: true });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAdd = async () => {
    if (productSelected) {
      dispatch(
        setNotaAddItem({
          id: "",
          amount: 1,
          productoId: productSelected?.id,
          producto: productSelected,
        })
      );

      dispatch(productClearInit());
    }
  };

  const changeTypeAction = useCallback(() => {
    if (dataHeader && action === "edit") {
      setCode(dataHeader?.code);
      setDate(dataHeader?.date);
      setCRP(dataHeader?.documentCrp);
      setTypeSelected({
        value: dataHeader?.type,
        label: `${dataHeader?.type == "EXIT" ? "Salida" : "Entrada"}`,
        name: "typeDocument",
      });
      setObservation(dataHeader?.observation);
      dispatch(setAreaSelected(dataHeader?.area || null));
      dispatch(setPlaceSelected(dataHeader?.lugar || null));
      dispatch(setReasonSelected(dataHeader?.motivo || null));
      dispatch(setSituationSelected(dataHeader?.situacion || null));
      dispatch(setNotaItems(dataItems));
    } else {
      dispatch(areaClearInit());
      dispatch(placeClearInit());
      dispatch(situationClearInit());
      dispatch(reasonClearInit());
      dispatch(notaClearInit());
      dispatch(productClearInit());
    }
  }, [dataItems, dataHeader, action, dispatch]);

  useEffect(() => {
    changeTypeAction();
  }, [changeTypeAction]);

  useEffect(() => {
    if (responseError) {
      if (responseError?.data?.errors)
        toast.error(JSON.stringify(responseError?.data?.errors));
      else toast.error(JSON.stringify(responseError?.data?.message));
    } else if (data) {
      if (action === "edit") {
        toast.success("Nota editado correctamente!");
      } else {
        toast.success("Nota creado correctamente!");
        dispatch(notaClearInit());
      }
    }
    return () => {};
  }, [data, responseError]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header
          title={`${action === "edit" ? "EDITAR" : "CREAR"} NOTA DE PEDIDO`}
        />
        <div className="flex flex-row">
          <button
            type="button"
            onClick={() => setOpened((prevState) => !prevState)}
            style={{ color: `${currentColor}`, borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            title="Crear observación"
          >
            {observation == "" ? <RiDiscussLine /> : <RiDiscussFill />}
          </button>
          <button
            type="button"
            onClick={handleAdd}
            style={{ color: `${currentColor}`, borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            title="Agregar Item"
          >
            <RiAddLine />
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/authorized/nota-pedido", { replace: true });
            }}
            style={{ color: `${currentColor}`, borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            title="Regresar a la lista"
          >
            <RiArrowGoBackLine />
          </button>
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
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
              value={code || ""}
              placeholder="AUTOGENERADO"
              disabled
            />
          </div>
          {/* Tipo documento */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-lg">Tipo documento</label>
            <div className="relative mt-1">
              <Select
                name="typeDocumento"
                isClearable
                isSearchable
                options={typeDocument}
                onChange={handleChange}
                value={typeSelected || {}}
                required
              />
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
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Area Solicitante - CRP - Destino y/o Actividad */}
        <div className="flex flex-col lg:flex-row -mx-3 mb-6">
          {/* Area Solicitante */}
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-lg">Area Solicitante</label>
            <div className="relative mt-1">
              <MasterSelect
                selected={areaSelected}
                maintainer="areas"
                required={true}
              />
            </div>
          </div>
          {/* CRP */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-lg">CRP</label>
            <input
              id="crp"
              className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="text"
              name="crp"
              value={crp || ""}
              onChange={(e) => setCRP(e.target.value)}
              required
            />
          </div>
          {/* Destino y/o Actividad */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">
              {typeSelected?.value == "ENTRY"
                ? "Lugar de desmontaje"
                : "Destino y/o Actividad"}
            </label>
            <div className="relative mt-1">
              <MasterSelect
                selected={placeSelected}
                maintainer="lugares"
                required={true}
              />
            </div>
          </div>
        </div>
        {/* Situacion - Producto - Motivo */}
        <div className="flex flex-col lg:flex-row -mx-3 mb-6">
          {/* Situacion */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">Situación</label>
            <div className="mt-1">
              <MasterSelect
                selected={situationSelected}
                maintainer="situaciones"
                required={true}
              />
            </div>
          </div>
          {/* Lista Producto */}
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-lg">Producto</label>
            <div className="relative mt-1">
              <MasterSelect
                selected={productSelected}
                maintainer="productos"
                required={false}
              />
            </div>
          </div>
          {/* Motivo */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">Motivo</label>
            <div className="mt-1">
              <MasterSelect
                selected={reasonSelected}
                maintainer="motivos"
                required={true}
              />
            </div>
          </div>
        </div>
        {/* Table */}
        <NotaTable action={action} isLoadingItems={isLoadingItems} />
        {/* Buttons */}
        <div className="flex justify-start gap-y-4 mt-5">
          <button
            type="submit"
            className="w-400 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold mt-0"
            style={{ backgroundColor: currentColor }}
            disabled={notaItems?.length > 0 ? false : true}
          >
            {isLoading ? "...Procesando" : "Guardar nota de pedido"}
          </button>
        </div>
        {/* Modal Observation */}
        <ObervationModal
          open={opened}
          setOpened={setOpened}
          observation={observation}
          setObservation={setObservation}
        />
      </form>
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
