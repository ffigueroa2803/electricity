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
            ? data?.id != "create"
              ? `/api/notas/${data?.id}`
              : null
            : data?.id != "create"
            ? `/api/notas/${data?.id}/items`
            : null
        }`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(arg);
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

    registerItemNota: builder.mutation({
      query: (data) => ({
        url: `/api/notas/${data?.id}/items`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Notas", page, limit },
      ],
    }),

    deleteItemNota: builder.mutation({
      query: (id) => ({
        url: `/api/items/${id}`,
        method: "DELETE",
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
  useRegisterItemNotaMutation,
  useDeleteItemNotaMutation,
} = notaApi;
