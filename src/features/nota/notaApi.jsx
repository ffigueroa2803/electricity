import { apiSlice } from "../api/apiSlice";

export const notaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotas: builder.query({
      query: ({ page, limit, search }) =>
        `/api/notas?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Notas"],
    }),

    getNotaIdItems: builder.query({
      query: (data) =>
        `${
          data?.typeAction === "header"
            ? `/api/notas/${data?.id}`
            : `/api/notas/${data?.id}/items`
        }`,
    }),

    registerUpdateNota: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "new" ? "/api/notas" : `/api/notas/${data?.id}`
        }`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Notas", page, limit },
      ],
    }),
  }),
});

export const {
  useGetNotasQuery,
  useGetNotaIdItemsQuery,
  useRegisterUpdateNotaMutation,
} = notaApi;
