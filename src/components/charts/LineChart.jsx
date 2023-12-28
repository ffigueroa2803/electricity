import { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import {
  LinePrimaryXAxis,
  LinePrimaryYAxis,
  lineCustomSeries,
} from "../../data/dummy";
import { useSelector } from "react-redux";
import { useGetProductWithMoreMovementAnualQuery } from "../../features/product/productApi";

export const LineChart = ({ setTitle }) => {
  const chartData = [[], []];
  const { currentMode } = useSelector((state) => state?.theme);
  const [lineCustomSeriesP, setLineCustomSeriesP] = useState([]);

  const {
    data: recentMovementAnual,
    isLoadingMovementAnual,
    errorMovementAnual,
  } = useGetProductWithMoreMovementAnualQuery({
    refetchOnMountOrArgChange: true,
  });

  const lineChartData = async () => {
    recentMovementAnual?.entry?.map((item) => {
      const agruparPorYear = Object.groupBy(
        item?.data,
        (result) => result.year
      );
      [agruparPorYear]?.map((item) => {
        for (let clave in item) {
          item[clave]?.map((result) => {
            chartData?.[0].push({
              x: new Date(result?.year, 0, 1),
              y: parseInt(result?.amount),
            });
          });
        }
      });
    });

    recentMovementAnual?.exit?.map((item) => {
      const agruparPorYear = Object.groupBy(
        item?.data,
        (result) => result.year
      );
      [agruparPorYear]?.map((item) => {
        for (let clave in item) {
          item[clave]?.map((result) => {
            chartData?.[1].push({
              x: new Date(result?.year, 0, 1),
              y: parseInt(result?.amount),
            });
          });
        }
      });
    });

    setLineCustomSeriesP([
      {
        dataSource: chartData[0],
        xName: "x",
        yName: "y",
        name: "Entrada",
        width: "2",
        marker: { visible: true, width: 10, height: 10 },
        type: "Line",
      },

      {
        dataSource: chartData[1],
        xName: "x",
        yName: "y",
        name: "Salida",
        width: "2",
        marker: { visible: true, width: 10, height: 10 },
        type: "Line",
      },
    ]);
  };

  useEffect(() => {
    setTitle(recentMovementAnual?.entry[0]?.name);
    lineChartData();
  }, [recentMovementAnual]);

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeriesP?.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
