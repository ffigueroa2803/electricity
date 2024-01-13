import { apiSlice } from "../api/apiSlice";

export const reasonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReasons: builder.query({
      query: ({ page, limit, search }) =>
        `/api/motivos?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Motivos"],
    }),

    registerUpdateReason: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "new"
            ? "/api/motivos"
            : `/api/motivos/${data?.id}`
        }`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Motivos", page, limit },
      ],
    }),

    deleteReason: builder.mutation({
      query: (id) => ({
        url: `/api/motivos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Motivos", page, limit },
      ],
    }),
  }),
});

export const {
  useGetReasonsQuery,
  useLazyGetReasonsQuery,
  useRegisterUpdateReasonMutation,
  useDeleteReasonMutation,
} = reasonApi;
