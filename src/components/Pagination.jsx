import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({
  totalPages,
  currentPage,
  totalItems,
  changeCurrentPage,
}) => {
  const { currentColor } = useSelector((state) => state?.theme);

  const dispatch = useDispatch();

  const changeCurrentPageNumberInc = (currentPage) => {
    if (Number(currentPage) < Number(totalPages)) {
      dispatch(changeCurrentPage(currentPage + 1));
    } else if (Number(currentPage) === Number(totalPages)) {
      alert("cannot increase more");
    }
  };

  const changeCurrentPageNumberDec = (currentPage) => {
    if (Number(currentPage) === 1) {
      alert("No puede volver a su página 1");
    } else {
      dispatch(changeCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className="bg-white">
      <div className="container flex flex-col items-center px-6 py-5 mx-auto space-y-6 sm:flex-row sm:justify-between sm:space-y-0 ">
        <div className="flex flex-row -mx-2">
          {/* Previous */}
          <button
            disabled={Number(currentPage) === 1}
            onClick={() => changeCurrentPageNumberDec(currentPage)}
            style={{
              background: Number(currentPage) === 1 ? "" : currentColor,
            }}
            className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md text-white disabled:bg-gray-200`}
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="mx-1">Anterior</span>
            </div>
          </button>
          {/* Next */}
          <button
            disabled={
              Number(totalPages === 0 ? 1 : totalPages) === Number(currentPage)
            }
            onClick={() => changeCurrentPageNumberInc(currentPage)}
            style={{
              background:
                Number(totalPages === 0 ? 1 : totalPages) ===
                Number(currentPage)
                  ? ""
                  : currentColor,
            }}
            className="px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md text-white disabled:bg-gray-200"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Siguiente</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
        <div className="text-gray-500">
          <span className="font-medium">
            {currentPage} - {totalPages} de {totalItems} registros
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
