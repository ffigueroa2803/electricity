import { apiSlice } from "../api/apiSlice";
import { setNotaItems } from "./notaSlice";

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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (arg?.typeAction == "items") dispatch(setNotaItems(result?.data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    registerUpdateNota: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "create"
            ? "/api/notas"
            : `/api/notas/${data?.id}`
        }`,
        method: `${data?.typeAction === "create" ? "POST" : "PUT"}`,
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
