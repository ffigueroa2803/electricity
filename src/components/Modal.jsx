import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({
  open,
  setOpened,
  control,
  items,
  typeAction,
  setDataInput,
  title,
  mutation,
  clearInit,
  toast,
}) => {
  const id = items?.id || null;

  const { currentColor } = useSelector((state) => state?.theme);

  const { page, limit } = useSelector((state) => state?.place);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [registerUpdate, { data, isLoading, error: responseError }] =
    mutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUpdate({
        id,
        name,
        description,
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
      setName(items?.name);
      setDescription(items?.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [typeAction, items, dispatch]);

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
        setName(data?.name);
        setDescription(data?.description);
        toast.success("Editado correctamente!");
      } else {
        toast.success("Creado correctamente!");
        dispatch(clearInit());
      }
    }
  }, [data, responseError]);

  return (
    open && (
      <>
        <div className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer" />
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/3 left-1/2 z-20 -translate-x-1/2 -translate-y-1/3">
          <div className="flex justify-between items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900 align-middle">
              {typeAction === "edit" ? "EDITAR" : "NUEVO"}
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
            <div>
              {/* Name */}
              <div>
                <label className="font-medium text-lg">Nombre</label>
                <input
                  id="name"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Description */}
              <div className="mt-4">
                <label className="font-medium text-lg">Descripción</label>
                <textarea
                  id="description"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  name="description"
                  cols="40"
                  rows="5"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* Button */}
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold"
                  disabled={isLoading}
                  style={{ backgroundColor: currentColor }}
                >
                  {isLoading ? "...Procesando" : "Guardar datos"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default Modal;
