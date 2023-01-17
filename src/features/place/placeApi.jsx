import { apiSlice } from "../api/apiSlice"

export const placeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getPlaces: builder.query({
      query: ({ page, limit, search }) =>
        `/api/lugares?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Lugares"],
    }),

    registerUpdatePlace: builder.mutation({
      query: (data) => ({
        url: `${data?.typeAction === "new" ? "/api/lugares" : `/api/lugares/${data?.id}`}`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Lugares", page, limit },
      ],
    }),
  }),
})

export const { useGetPlacesQuery, useRegisterUpdatePlaceMutation } = placeApi