import { apiSlice } from "../api/apiSlice"

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getUsers: builder.query({
      query: ({ page, limit, search }) =>
        `/api/users?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["Users"],
    }),

    registerUpdate: builder.mutation({
      query: (data) => ({
        url: `${data?.typeAction === "new" ? "/api/users" : `/api/users/${data?.id}`}`,
        method: `${data?.typeAction === "new" ? "POST" : "PUT"}`,
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "Users", page, limit },
      ],
    }),
  }),
})

export const { useGetUsersQuery, useRegisterUpdateMutation } = userApi
