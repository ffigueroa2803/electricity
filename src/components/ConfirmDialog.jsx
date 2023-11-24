import React from "react";
import { useSelector } from "react-redux";

const ConfirmDialog = ({ open, onClose, onConfirm, title, data, loading }) => {
  const { currentColor } = useSelector((state) => state?.theme);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        open ? "" : "hidden"
      } cursor-pointer`}
    >
      <div className="flex items-end justify-center min-h-screen lg:mt-48 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:w-full sm:max-w-md ${
            open ? "sm:w-full" : "sm:w-0 sm:max-w-0"
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-2xl leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {title} #{data.code}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ¿Estás segura de que quieres realizar esta acción?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onConfirm}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              style={{ backgroundColor: currentColor }}
              disabled={loading === true ? true : false}
            >
              {loading === true ? "Procesando" : "Confirmar"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
