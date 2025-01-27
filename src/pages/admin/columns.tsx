import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button.tsx';
import { Trash2, User } from 'lucide-react';

export type UserInfo = {
  id: number;
  name: string;
  userName: string;
};

export const getColumns = (onClick: (id: number) => void, onDelete: (id: number) => void): ColumnDef<UserInfo>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'ФИО',
    },
    {
      accessorKey: 'userName',
      header: 'Логин',
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className={'flex gap-2'}>
            <Button onClick={() => onClick(user.id)}>
              <User />
            </Button>
            <Button onClick={() => onDelete(user.id)}>
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];
};
