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
      invalidatesTags: ["User"],
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

          // we validate if themeMode exists
          const themeMode = localStorage.getItem("themeMode");
          if (themeMode) dispatch(themeSetMode(themeMode));
          else dispatch(themeSetMode("Dark"));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    profile: builder.query({
      query: () => ({
        url: "/api/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // dispatch those data to redux store
          dispatch(userProfile({ user: result.data }));
        } catch (err) {
          dispatch(userProfile({ user: undefined }));
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/auth/profile",
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userProfile({
              user: result.data,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useProfileQuery, useUpdateProfileMutation } =
  authApi;
