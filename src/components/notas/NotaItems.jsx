import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useGetNotaIdItemsQuery } from "../../features/nota/notaApi";
import { setNotaItems } from "../../features/nota/notaSlice";

const NotaItems = ({ notaItems, setNotaDeleteItem, notaId, action }) => {
  const dispatch = useDispatch();

  const { currentColor } = useSelector((state) => state?.theme);

  const {
    data,
    isLoading,
    error: responseError,
  } = useGetNotaIdItemsQuery({ typeAction: action, id: notaId }) || null;

  useEffect(() => {
    if (responseError) {
      if (responseError?.data?.errors)
        toast.error(JSON.stringify(responseError?.data?.errors));
      else toast.error(JSON.stringify(responseError?.data?.message));
    } else if (data) {
      console.log(data);
      // dispatch(setNotaItems(data));
    }
  }, [data, responseError]);

  return (
    <div className="overflow-x-auto w-full border-b-1 border-gray-200">
      <table className="mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden lg:table-fixed lg:w-[100%]">
        <thead style={{ background: currentColor }}>
          <tr className="text-white text-left">
            <th className="font-semibold text-sm uppercase px-6 py-4 w-[5%]">
              Item
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4 truncate">
              Código
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
          {notaItems.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{item?.code}</td>
              <td className="px-6 py-4 truncate">{item?.nombre}</td>
              <td className="px-6 py-4 text-center">{item?.medida}</td>
              <td className="px-6 py-4 text-center">
                <input
                  id="cantidad"
                  className="w-20 border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-center"
                  type="number"
                  name="cantidad"
                  defaultValue={1}
                />
              </td>
              <td className="px-6 py-4 text-center">
                {" "}
                <button
                  type="button"
                  onClick={() => dispatch(setNotaDeleteItem(item?.id))}
                  style={{ color: currentColor, borderRadius: "50%" }}
                  className="text-gray-500 text-xl hover:drop-shadow-xl hover:bg-light-gray p-2"
                  title="Eliminar producto"
                >
                  <RiDeleteBin2Line />
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  );
};

export default NotaItems;
