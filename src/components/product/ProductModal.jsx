import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUpdateProductMutation } from "../../features/product/productApi";
import { MdOutlineCancel } from "react-icons/md";
import { productClearInit } from "../../features/product/productSlice";
import { MasterSelect } from "..";
import { setBrandSelected } from "../../features/brand/brandSlice";
import { setMeasureSelected } from "../../features/measure/measureSlice";

const ProductModal = ({
  open,
  control,
  product,
  typeAction,
  setDataInput,
  toast,
}) => {
  const id = product?.id || null;

  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit } = useSelector((state) => state?.product);
  const { brandSelected } = useSelector((state) => state?.brand);
  const { measureSelected } = useSelector((state) => state?.measure);

  const [code, setCode] = useState("");
  const [codePatrimonial, setCodePatrimonial] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  const [serie, setSerie] = useState("");
  const [potencia, setPotencia] = useState("");
  const [year, setYear] = useState("");

  const dispatch = useDispatch();

  const [registerUpdateProduct, { data, isLoading, error: responseError }] =
    useRegisterUpdateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUpdateProduct({
        id,
        code,
        codePatrimonial,
        name,
        description,
        stock: parseInt(stock),
        serie,
        potencia,
        year: parseInt(year),
        attributos: [],
        marcaId: `${brandSelected?.id}`,
        medidaId: `${measureSelected?.id}`,
        page,
        limit,
        typeAction,
      });
      setDataInput("");
    } catch (error) {
      toast.error(error);
    }
  };

  const changeTypeAction = useCallback(() => {
    if (typeAction === "edit") {
      setCode(product?.code);
      setCodePatrimonial(product?.codePatrimonial);
      setName(product?.name);
      setDescription(product?.description);
      setStock(product?.stock);
      setSerie(product?.serie);
      setPotencia(product?.potencia || null);
      setYear(product?.year);
      dispatch(setBrandSelected(product?.marca || null));
      dispatch(setMeasureSelected(product?.medida || null));
    } else {
      setCode("");
      setCodePatrimonial("");
      setName("");
      setDescription("");
      setStock(0);
      setSerie("");
      setPotencia("");
      setYear("");
      dispatch(setBrandSelected(null));
      dispatch(setMeasureSelected(null));
    }
  }, [typeAction, product, dispatch]);

  useEffect(() => {
    changeTypeAction();
  }, [changeTypeAction]);

  useEffect(() => {
    if (responseError) {
      if (responseError?.data?.errors)
        toast.error(JSON.stringify(responseError?.data?.errors));
      else toast.error(JSON.stringify(responseError?.data?.message));
    } else if (data) {
      if (typeAction === "edit") {
        toast.success("Producto editado correctamente!");
      } else {
        toast.success("Producto creado correctamente!");
        dispatch(productClearInit());
      }
    }
  }, [data, responseError]);

  return (
    open && (
      <>
        <div className="fixed w-full h-full inset-0 z-10 bg-half-transparent cursor-pointer" />
        <div className="rounded w-[400px] lg:w-[900px] space-y-8 bg-white p-10 absolute top-1/3 left-1/2 z-20 -translate-x-1/2 -translate-y-1/3 overflow-auto lg:mt-0 mt-52">
          <div className="flex justify-between items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              {typeAction === "edit" ? "EDITAR PRODUCTO" : "NUEVO PRODUCTO"}
            </h1>
            <button
              type="button"
              onClick={control}
              style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Nombre del producto */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="font-medium text-lg">
                  Nombre del producto
                </label>
                <input
                  id="name"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Codigo Material, Codigo Patrimonial, Stock */}
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              {/* Code Patrimonial */}
              <div className="w-full md:w-1/2 px-3">
                <label className="font-medium text-lg">
                  Codigo Patrimonial
                </label>
                <input
                  id="codepa"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="codepa"
                  value={codePatrimonial}
                  onChange={(e) => setCodePatrimonial(e.target.value)}
                />
              </div>
              {/* Stock */}
              <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
                <label className="font-medium text-lg">Stock</label>
                <input
                  id="stock"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Serie, Potencia, Año */}
            <div className="flex flex-col lg:flex-row -mx-3 mb-6">
              {/* Serie */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">Serie</label>
                <input
                  id="serie"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="serie"
                  value={serie || ""}
                  onChange={(e) => setSerie(e.target.value)}
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
                  value={potencia || ""}
                  onChange={(e) => setPotencia(e.target.value)}
                />
              </div>
              {/* Año */}
              <div className="w-full md:w-1/2 px-3 mt-6 lg:mt-0">
                <label className="font-medium text-lg">Año</label>
                <input
                  id="anio"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="year"
                  value={year || ""}
                  onChange={(e) => setYear(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* DropdownList */}
            <div className="flex flex-row -mx-3 mb-6">
              {/* Marca */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">Marca</label>
                <div className="relative mt-1">
                  <MasterSelect selected={brandSelected} maintainer="marcas" />
                </div>
              </div>
              {/* Medida */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="font-medium text-lg">Medida</label>
                <div className="relative mt-1">
                  <MasterSelect
                    selected={measureSelected}
                    maintainer="medidas"
                  />
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
