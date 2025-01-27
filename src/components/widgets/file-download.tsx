import { useGetFileQuery } from '@/entities/upload/api.ts';

const FileDownload = () => {
  const { data, error, isLoading, isSuccess } = useGetFileQuery({
    type: 'events', // Тип файла
    id: '123', // ID файла
  });

  const downloadFile = () => {
    if (data) {
      // Создаем объект URL для скачивания файла
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'file.pdf'; // Имя файла для скачивания (можно изменить)
      a.click();
      window.URL.revokeObjectURL(url); // Освобождаем ресурсы
    }
  };

  return (
    <div>
      <button onClick={downloadFile} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Download File'}
      </button>

      {isSuccess && <p>File ready for download!</p>}
      {error && <p>Error: {(error as any)?.message}</p>}
    </div>
  );
};

export default FileDownload;
