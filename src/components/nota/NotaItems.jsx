import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotaDeleteItem,
  setNotaEditItemAmount,
} from "../../features/nota/notaSlice";
import { RiDeleteBin2Line } from "react-icons/ri";

const NotaItems = ({ item, index, action }) => {
  const dispatch = useDispatch();

  const { currentColor } = useSelector((state) => state?.theme);

  const [amount, setAmount] = useState(item?.amount);

  const handleChange = (e, productId) => {
    setAmount(e.target.value);
    dispatch(
      setNotaEditItemAmount({
        id: productId,
        amount: parseInt(e.target.value),
      })
    );
  };

  useEffect(() => {
    setAmount(item?.amount);
  }, [item]);

  return (
    <>
      <tr key={index}>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{item?.producto?.code}</td>
        <td className="px-6 py-4 truncate">{item?.producto?.name}</td>
        <td className="px-6 py-4 text-center">
          {item?.producto?.medida?.name}
        </td>
        <td className="px-6 py-4 text-center">
          <input
            id="cantidad"
            className="w-20 border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-center"
            type="number"
            name="cantidad"
            value={amount || 1}
            onChange={(e) => handleChange(e, item?.producto?.id)}
          />
        </td>
        <td className="px-6 py-4 text-center">
          {" "}
          <button
            type="button"
            onClick={() => dispatch(setNotaDeleteItem(item?.producto?.id))}
            style={{ color: currentColor }}
            className="text-gray-500 text-xl"
            title="Eliminar producto"
          >
            <RiDeleteBin2Line />
          </button>{" "}
        </td>
      </tr>
    </>
  );
};

export default NotaItems;
