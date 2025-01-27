import { apiSlice } from '@/lib/api.ts';
import { Doctor, Filial } from '@/entities/admin/types.ts';

export const adminApi = apiSlice.enhanceEndpoints({
  addTagTypes: ['Filials'],
});

export const adminApiSlice = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilials: builder.query<Filial[], void>({
      query: () => ({
        url: '/helpers/filials',
        method: 'GET',
      }),
      providesTags: ['Filials'],
    }),
    getDoctorSpecs: builder.query<{ id: number; name: string }[], void>({
      query: () => ({
        url: '/helpers/doctor-specs',
        method: 'GET',
      }),
    }),
    getDoctors: builder.query<Doctor[], void>({
      query: () => ({
        url: '/helpers/doctors',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetFilialsQuery, useGetDoctorsQuery, useGetDoctorSpecsQuery } = adminApiSlice;
