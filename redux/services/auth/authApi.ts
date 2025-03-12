import { resetAuth, setAuthUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import { toast } from "sonner";
import {
  addLoginData,
  removeLoginData,
  removeOnboardingData,
} from "@/lib/helpers";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (auth) => ({
        url: `auth/login`,
        method: "POST",
        body: auth,
        // credentials: "include" as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result;
          addLoginData(data?.token, true);
          dispatch(setAuthUser(data));
        } catch (error: any) {
          // console.log(error)
        }
      },
    }),

    // Reset password logged in
    resetPasswordLoggedIn: builder.mutation({
      query: ({ submitdata }: any) => ({
        url: `auth/resetpassword`,
        method: "PATCH",
        body: submitdata,
      }),
      invalidatesTags: ["auth", "user"],
    }),
    // login: build.mutation({
    //   query: (auth) => ({
    //     url: "auth/login",
    //     method: "POST",
    //     body: auth,
    //   }),
    //   invalidatesTags: [
    //     "Auth",
    //     "user",
    //     "tenant",
    //     "artist",
    //     "product",
    //     "revenue",
    //     "asset",
    //     "payment",
    //     "expense",
    //     "royalties",
    //     "splits",
    //     "checklists",
    //   ],
    // }),
    signup: builder.mutation({
      query: (payload) => ({
        url: `/auth/signup`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const {
            data: { data },
          } = result;
          Cookies.set("token", data.token);
          dispatch(setAuthUser(data));
        } catch (error: any) {
          // console.log("Error:", error);
        }
      },
    }),

    inviteUser: builder.mutation({
      query: (bodyData) => {
        return {
          url: `auth/send-invite`,
          method: "POST",
          body: bodyData,
        };
      },
      invalidatesTags: ["auth", "user"],
    }),

    bulkInviteUser: builder.mutation({
      query: (invites) => {
        return {
          url: `auth/bulk-send-invite`,
          method: "POST",
          body: invites,
        };
      },
      invalidatesTags: ["auth", "user"],
    }),

    // Get logged in users data
    getLoggedInUsersData: builder.query({
      query: () => `auth`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result;
          dispatch(setAuthUser(data?.user));
        } catch (error: any) {
          // console.log(error)
        }
      },
      // providesTags: ["Auth"],
    }),

    // set password
    setPassword: builder.mutation({
      query: (auth) => ({
        url: "auth/setpassword",
        method: "POST",
        body: auth,
      }),
      invalidatesTags: [],
    }),

    verifyEmail: builder.mutation({
      query: ({ email, ...auth }) => ({
        url: `auth/verify?email=${email}`,
        method: "POST",
        body: auth,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (auth) => ({
        url: "auth/forgotpassword",
        method: "POST",
        body: auth,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ submitdata, token }) => ({
        url: `auth/resetpassword?code=${token}`,
        method: "PATCH",
        body: submitdata,
      }),
    }),

    loginLink: builder.mutation({
      query: (auth) => ({
        url: "auth/loginlink",
        method: "POST",
        body: auth,
      }),
    }),

    selectWorkspace: builder.query({
      query: (workspaceId) => `/auth/authtoken?currentWorkspace=${workspaceId}`,
    }),

    import: builder.mutation({
      query: (file) => ({
        url: "auth/importdata",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["auth", "user"],
    }),

    fileUpload: builder.mutation({
      query: (file) => ({
        url: "file/upload-url",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["auth", "user"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
        // credentials: "include" as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          removeLoginData();
          if (typeof window !== "undefined") {
            window.location.href = "/signin";
          }
          dispatch(resetAuth());
        } catch (error: any) {
          // toast.error("Error:", error.error.error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useGetLoggedInUsersDataQuery,
  useSetPasswordMutation,
  useSelectWorkspaceQuery,
  useLoginLinkMutation,
  useImportMutation,
  useFileUploadMutation,
  useInviteUserMutation,
  useResetPasswordLoggedInMutation,
  useBulkInviteUserMutation,
} = authApi;
