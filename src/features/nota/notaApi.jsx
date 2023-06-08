import { apiSlice } from "../api/apiSlice";

export const notaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useRegisterUpdateNotaMutation } = notaApi;
