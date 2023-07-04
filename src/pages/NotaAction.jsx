import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Header, MasterSelect, NotaItems } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowGoBackLine, RiAddLine } from "react-icons/ri";
import Select from "react-select";
import { motivo, situation, typeDocument } from "../data/dummy";
import {
  notaClearInit,
  setNotaAddItem,
  setNotaDeleteItem,
} from "../features/nota/notaSlice";
import { useRegisterUpdateNotaMutation } from "../features/nota/notaApi";

export const NotaAction = () => {
  let { notaId, action } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentColor } = useSelector((state) => state?.theme);
  const { productSelected } = useSelector((state) => state?.product);
  const { areaSelected } = useSelector((state) => state?.area);
  const { placeSelected } = useSelector((state) => state?.place);
  const { notaItems } = useSelector((state) => state?.nota);

  const [typeSelected, setTypeSelected] = useState(null);
  const [situacionSelected, setSituacionSelected] = useState(null);
  const [motivoSelected, setMotivoSelected] = useState(null);
  const [date, setDate] = useState(null);
  const [crp, setCRP] = useState("");

  const [registerUpdateNota, { data, isLoading, error: responseError }] =
    useRegisterUpdateNotaMutation();

  const handleChange = (selectedOption) => {
    if (selectedOption?.name == "typeDocument")
      setTypeSelected(selectedOption?.value);
    if (selectedOption?.name == "situacion")
      setSituacionSelected(selectedOption?.value);
    if (selectedOption?.name == "motivo")
      setMotivoSelected(selectedOption?.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    dispatch(
      setNotaAddItem({
        id: productSelected?.id,
        code: productSelected?.code,
        nombre: productSelected?.name,
        medida: productSelected?.medida?.name,
        amount: 1,
      })
    );
    console.log(notaItems);
  };

  const changeTypeAction = useCallback(() => {
    if (action === "edit") {
    } else {
    }
  }, [action, dispatch]);

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
        toast.success("Nota de pedido editado correctamente!");
      } else {
        toast.success("Nota de pedido creado correctamente!");
        dispatch(notaClearInit());
      }
    }
  }, [data, responseError]);

  useEffect(() => {}, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header title={`CREAR NOTA DE PEDIDO`} />
        <div className="flex flex-row">
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
            onClick={() =>
              navigate("/authorized/nota-pedido", { replace: true })
            }
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
              <Select
                name="situacion"
                isClearable
                isSearchable
                options={situation}
                onChange={handleChange}
                required
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
                required={true}
              />
            </div>
          </div>
          {/* Motivo */}
          <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
            <label className="font-medium text-lg">Motivo</label>
            <div className="mt-1">
              <Select
                name="motivo"
                isClearable
                isSearchable
                options={motivo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Table */}
        <NotaItems
          notaItems={notaItems}
          setNotaDeleteItem={setNotaDeleteItem}
          notaId={notaId}
          action={action}
        />
        {/* Buttons */}
        <div className="flex justify-start gap-y-4 mt-5">
          <div className="">
            <button
              type="button"
              className="w-400 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold mt-0"
              style={{ backgroundColor: currentColor }}
              onClick={() => alert("Hola")}
            >
              Observación
            </button>
          </div>
          <div className="ml-4">
            <button
              type="submit"
              className="w-400 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold mt-0"
              style={{ backgroundColor: currentColor }}
            >
              Guardar pedido
            </button>
          </div>
        </div>
      </form>
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};
