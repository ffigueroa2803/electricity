import { apiSlice } from "../api/apiSlice";

export const measureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMeasures: builder.query({
      query: ({ page, limit, search }) =>
        `/api/medidas?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Medidas"],
    }),

    registerUpdateMeasure: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "new"
            ? "/api/medidas"
            : `/api/medidas/${data?.id}`
        }`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Medidas", page, limit },
      ],
    }),

    deleteMeasure: builder.mutation({
      query: (id) => ({
        url: `/api/medidas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Medidas", page, limit },
      ],
    }),
  }),
});

export const {
  useGetMeasuresQuery,
  useRegisterUpdateMeasureMutation,
  useDeleteMeasureMutation,
} = measureApi;
