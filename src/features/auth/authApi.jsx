import { apiSlice } from "../api/apiSlice";
import { themeSetMode } from "../theme/themeSlice";
import { userLoggedIn, userProfile } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // when fulfilled set data to localstorage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
            })
          );

          // dispatch those data to redux store
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
            })
          );
          dispatch(themeSetMode("Light"));
        } catch (err) {}
      },
    }),

    profile: builder.query({
      query: () => "/api/auth/profile",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // dispatch those data to redux store
          dispatch(
            userProfile({
              user: result.data,
            })
          );
        } catch (err) {
          dispatch(
            userProfile({
              user: undefined,
            })
          );
        }
      },
    }),
  }),
});

export const { useLoginMutation, useProfileQuery } = authApi;
