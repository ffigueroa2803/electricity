import { apiSlice } from "../api/apiSlice"

export const areaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAreas: builder.query({
      query: ({ page, limit, search }) =>
        `/api/areas?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Areas"],
    }),

    registerUpdateArea: builder.mutation({
      query: (data) => ({
        url: `${data?.typeAction === "new" ? "/api/areas" : `/api/areas/${data?.id}`}`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Areas", page, limit },
      ],
    }),
  }),
})

export const { useGetAreasQuery, useRegisterUpdateAreaMutation } = areaApi