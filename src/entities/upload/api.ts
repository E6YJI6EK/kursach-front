import { apiSlice } from '@/lib/api.ts';

export const uploadApi = apiSlice.enhanceEndpoints({
  addTagTypes: ['File'],
});

export const uploadApiSlice = uploadApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      {
        message: string;
        filename: string;
        path: string; // Путь к файлу
      },
      { type: string; id: string; file: File }
    >({
      query: ({ type, id, file }) => {
        const formData = new FormData();
        formData.append('file', file); // Добавляем файл в FormData

        return {
          url: `files/upload/${type}/${id}`,
          method: 'POST',
          body: formData, // тело запроса с файлом
        };
      },
    }),
    getFile: builder.query<Blob, { type: string; id: string }>({
      query: ({ type, id }) => `/files/${type}/${id}`, // Запрос на получение файла
      // Для получения бинарных данных, нужно использовать `responseType: 'blob'`
      transformResponse: (response) => response, // Преобразуем ответ в Blob
    }),
  }),
});

export const { useUploadFileMutation, useGetFileQuery } = uploadApiSlice;
