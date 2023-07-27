import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import NotaItems from "./NotaItems";
import LoadingCircle from "../LoadingCircle";
import NotFound from "../NotFound";

const NotaTable = ({ action, isLoadingItems }) => {
  const { currentColor } = useSelector((state) => state?.theme);
  const { notaItems } = useSelector((state) => state?.nota);

  return (
    <div className="overflow-x-auto w-full border-b-1 border-gray-200">
      <table className="mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden lg:table-fixed lg:w-[100%]">
        <thead style={{ background: currentColor }}>
          <tr className="text-white text-left">
            <th className="font-semibold text-sm uppercase px-6 py-4 w-[5%]">
              Item
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4 truncate">
              Código del material
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4 text-center w-[20%]">
              Descripción del material
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
              Unidad
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
              cantidad
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoadingItems ? (
            <LoadingCircle width="48" color={currentColor} colSpan="6" />
          ) : notaItems?.length === 0 ? (
            <NotFound title="No hay datos" colSpan="6" />
          ) : (
            notaItems?.map((item, index) => (
              <NotaItems
                key={index}
                item={item}
                index={index}
                action={action}
              />
            ))
          )}
        </tbody>
      </table>
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};

export default NotaTable;
