import { apiSlice } from "../api/apiSlice";

export const situationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSituations: builder.query({
      query: ({ page, limit, search }) =>
        `/api/situaciones?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Situaciones"],
    }),

    registerUpdateSituation: builder.mutation({
      query: (data) => ({
        url: `${
          data?.typeAction === "new"
            ? "/api/situaciones"
            : `/api/situaciones/${data?.id}`
        }`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Situaciones", page, limit },
      ],
    }),
  }),
});

export const {
  useGetSituationsQuery,
  useLazyGetSituationsQuery,
  useRegisterUpdateSituationMutation,
} = situationApi;
