import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (
  args,
  api,
  extraOptions,
) => {
  let token: string | null = null;
  try {
    token = localStorage.getItem('accessToken');
  } catch {
    token = null;
  }
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
};

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export type FetchError = {
  status: number;
  data: {
    statusCode: number;
    message: string;
    timestamp: string;
    path: string;
  };
}
