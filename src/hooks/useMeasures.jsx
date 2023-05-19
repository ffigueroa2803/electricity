import { useGetMeasuresQuery } from "../features/measure/measureApi";

export const useMeasures = (page = 1, limit = 60, search = "") => {
  const { data, isLoading, error } = useGetMeasuresQuery({
    page,
    limit,
    search,
  });
  return {
    dataMeasure: data,
    isLoadingMeasure: isLoading,
    errorMeasure: error,
  };
};
