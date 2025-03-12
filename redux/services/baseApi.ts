import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { resetAuth } from "../features/auth/authSlice";
import { clearStorageItem } from "@/hooks/useLocalStorage";
import { SETUP_TOKEN_CACHE_NAME, TOKEN_CACHE_NAME } from "@/lib/common";
import { unauthenticatedPaths } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const toastError = (errors: any) => {
  const errorKeys = Object.keys(errors);
  if (Array.isArray(errors[errorKeys[0]])) {
    const message = errors[errorKeys[0]][0];
    toast.error(message);
    return;
  } else {
    const message = errors[errorKeys[0]];
    toast.error(message);
  }
};

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    // let accessToken: string = localStorage.get("token") || "";
    const token =
      localStorage.getItem(TOKEN_CACHE_NAME) ||
      localStorage.getItem(SETUP_TOKEN_CACHE_NAME);

    // if (accessToken) {
    //   headers.set("Authorization", `Bearer ${accessToken}`);
    // }
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});

export const baseQueryInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    let res: any = result.error;
    const status = res?.status;

    if (
      res.status === 403 &&
      result.error &&
      status &&
      !unauthenticatedPaths.includes(window.location.pathname)
    ) {
      api.dispatch(resetAuth());
      localStorage.removeItem(SETUP_TOKEN_CACHE_NAME);
      localStorage.removeItem(TOKEN_CACHE_NAME);
      clearStorageItem();
      // window.location.href = "/auth/signin";
    }
    if (
      (res.status === 401 || res?.originalStatus === 401) &&
      result.error &&
      status &&
      !unauthenticatedPaths.includes(window.location.pathname)
    ) {
      api.dispatch(resetAuth());
      localStorage.removeItem(SETUP_TOKEN_CACHE_NAME);
      localStorage.removeItem(TOKEN_CACHE_NAME);
      clearStorageItem();

      // window.location.href = "/auth/signin";
      // let message = res.data.message;
      // toast.error(res?.data?.msg);
    }
    if (res.status === 400) {
      let message = res.data.message;
      toast.error(message);
    }
    if (res.status === 404) {
      let message = res.data.message;
      toast.error(message);
    }
    // if (res.status === 422) {
    //   if (res.data.errors) {
    //     toastError(res.data.errors);
    //   }
    //   if (res.data.error) {
    //     let message = res.data.error.message;
    //     toast.error(message);
    //   }
    // }

    if (res.status === 409) {
      let message = res.data.msg;
      toast.error(message);
    }

    if (res.status === 503) {
      let message = res.data.msg || res.data.message;
      toast.error(message);
    }

    if (res.status === 500) {
      let message = res.data.msg;
      toast.error(message);
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
  reducerPath: "baseApi",
  tagTypes: ["auth", "players", "attendance"],
});
