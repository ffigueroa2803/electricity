import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, search }) =>
        `/api/productos?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Products"],
    }),

    registerUpdateProduct: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "new"
            ? "/api/productos"
            : `/api/productos/${data?.id}`
        }`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Products", page, limit },
      ],
    }),

    getProductWithMoreMovement: builder.query({
      query: () => `/api/productos/resume/masMovimientos`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useRegisterUpdateProductMutation,
  useGetProductWithMoreMovementQuery,
} = productApi;
