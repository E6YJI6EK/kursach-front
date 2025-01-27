import { apiSlice } from '@/lib/api.ts';
import { userStore } from '@/entities/user/store.ts';
import { CreateUserPayload, GetUsersResponse, User, UserInfoResponse } from '@/entities/user/types.ts';

export const userApi = apiSlice.enhanceEndpoints({
  addTagTypes: ['User', 'Users'],
});

export const userApiSlice = userApi.injectEndpoints({
  endpoints: (builder) => ({
    init: builder.query<User, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: ['User'],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        dispatch(userStore.actions.setUserData(data));
      },
    }),
    getUsers: builder.query<
      GetUsersResponse,
      { page?: number; limit?: number; userType?: 'patients' | 'employees' | 'all' }
    >({
      query: (params) => ({
        url: '/user/view',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<User, CreateUserPayload>({
      query: (params) => ({
        url: '/user/create-user',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
    getUser: builder.query<UserInfoResponse, { id: number }>({
      query: ({ id }) => ({
        url: '/user/' + id,
        method: 'GET',
      }),
    }),
    deleteUser: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: '/user/delete-user/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useInitQuery,
  useLazyInitQuery,
  useDeleteUserMutation,
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserQuery,
} = userApiSlice;
