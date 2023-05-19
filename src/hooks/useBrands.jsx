import { useGetBrandsQuery } from "../features/brand/brandApi";

export const useBrands = (page = 1, limit = 60, search = "") => {
  const { data, isLoading, error } = useGetBrandsQuery({
    page,
    limit,
    search,
  });
  return {
    dataBrand: data,
    isLoadingBrand: isLoading,
    errorBrand: error,
  };
};
