import React, { useState } from 'react';
import { useUploadFileMutation } from '@/entities/upload/api.ts';
import { toast } from '@/hooks/use-toast.ts';
// Путь к API

const FileUpload = ({
  type,
  id,
  onUpload,
}: {
  type: 'doctors' | 'events';
  id: string;
  onUpload?: (path: string, filename: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { isLoading, isSuccess, isError, error }] = useUploadFileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const res = await uploadFile({ type, id, file }).unwrap();
        toast({ description: 'Файл загружен!' });
        onUpload?.(res.path, res.filename);
      } catch (err) {
        toast({ description: 'Ошибка во время загрузки файла' });
      }
    }
  };

  return (
    <div className={'flex flex-col gap-3 my-4'}>
      <input type="file" onChange={handleFileChange} />
      <button disabled={isLoading} onClick={handleSubmit} className={'text-background'}>
        {isLoading ? 'Загрузка...' : 'Загрузить'}
      </button>

      {isError && <p>{(error as any)?.message}</p>}
    </div>
  );
};

export default FileUpload;
