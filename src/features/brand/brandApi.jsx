import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: ({ page, limit, search }) =>
        `/api/marcas?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Marcas"],
    }),

    registerUpdateBrand: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "new" ? "/api/marcas" : `/api/marcas/${data?.id}`
        }`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Marcas", page, limit },
      ],
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/api/marcas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Marcas", page, limit },
      ],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useRegisterUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
