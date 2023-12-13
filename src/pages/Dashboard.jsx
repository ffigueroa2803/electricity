import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Header } from "../components";
import { LineChart } from "../components/charts/LineChart";
import { useGetProductWithMoreMovementQuery } from "../features/product/productApi";
import { TiTick } from "react-icons/ti";

export const Dashboard = () => {
  const { currentColor } = useSelector((state) => state?.theme);
  const [count, setCount] = useState(0);

  const {
    data: recentMovement,
    isLoading,
    error,
  } = useGetProductWithMoreMovementQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    const suma = recentMovement?.reduce((acumulador, objeto) => {
      return parseInt(acumulador) + parseInt(objeto?.amount);
    }, 0);
    setCount(suma);
  }, [recentMovement]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="TABLERO" />
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex gap-10 m-4 flex-wrap justify-center">
          {/* Recent Transactions */}
          <div className="bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-semibold">
                Movimiento Recientes Producto
              </p>
              <p>E/S</p>
            </div>
            <div className="mt-10 w-72 md:w-400">
              {recentMovement?.map((item) => (
                <div key={item.id} className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{
                        color: "rgb(228, 106, 118)",
                        backgroundColor: "rgb(255, 244, 229)",
                      }}
                      className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                    >
                      {<TiTick />}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <p className={`text-green-600`}>
                    {item.amountEntry + "/" + item.amountExit}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Total"
                  borderRadius="10px"
                />
              </div>
              <p className="text-gray-400 text-sm">
                {count} Movimientos de entradas y salidas.
              </p>
            </div>
          </div>
          {/* Sales Overview */}
          <div className="bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-xl font-semibold">
                Resumen de entrada y salida de productos
              </p>
              {/* <DropDown currentMode={currentMode} /> */}
            </div>
            <div className="md:w-full overflow-auto">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
