import { apiSlice } from '@/lib/api.ts';
import { Filial } from '@/entities/admin/types.ts';

export const commonApi = apiSlice.enhanceEndpoints({
  addTagTypes: [],
});

export const commonApiSlice = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrgInfo: builder.query<
      {
        org: { org_description: string; org_id: number; org_name: string; filials: Filial[] };
        services: { id: number; name: string }[];
      },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/helpers/org-info/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetOrgInfoQuery } = commonApiSlice;
