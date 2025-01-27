import { apiSlice } from '@/lib/api.ts';
import { LoginPayload, LoginResponse } from '@/entities/auth/types.ts';
import { userStore } from '@/entities/user/store.ts';

export const authApi = apiSlice.enhanceEndpoints({
  addTagTypes: ['Auth'],
});

export const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/auth/login',
        method: 'PUT',
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        localStorage.setItem('accessToken', data.accessToken);
        dispatch(userStore.actions.setAccessToken({ accessToken: data.accessToken }));
        dispatch(userStore.actions.setUserData(data.user));
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
