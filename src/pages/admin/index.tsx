import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { useDeleteUserMutation, useLazyGetUsersQuery } from '@/entities/user/api.ts';
import { useCallback, useEffect, useState } from 'react';
import { CreateUser } from './create-user.tsx';
import { DataTable } from '@/pages/admin/data-table.tsx';
import { getColumns, UserInfo } from '@/pages/admin/columns.tsx';
import { useAppDispatch } from '@/lib/redux.ts';
import { adminStore } from '@/entities/admin/store.ts';
import { UserInfo as UserInfoComponent } from './user-info.tsx';
import { useToast } from '@/hooks/use-toast.ts';

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [getUsers] = useLazyGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [users, setUsers] = useState<UserInfo[]>();
  const [choosedTab, setChoosedTab] = useState<'patients' | 'employees' | 'all'>('all');

  const initUsers = useCallback(async () => {
    const res = await getUsers({
      page: 1,
      limit: 10,
      userType: choosedTab,
    }).unwrap();
    if (res.data) {
      const preparedValues: UserInfo[] = res.data.map((item) => ({
        id: item.user_id,
        name: [item.last_name, item.first_name, item.patronymic ?? ''].join(' '),
        userName: item.userName,
      }));
      setUsers(preparedValues);
    }
  }, [choosedTab, getUsers]);

  useEffect(() => {
    initUsers();
  }, [initUsers, choosedTab, getUsers]);

  const onDeleteUser = async (id: number) => {
    try {
      await deleteUser({ id }).unwrap();
      toast({
        title: 'Успешно!',
        description: 'Пользователь был успешно удален',
      });
      await initUsers();
    } catch (e) {
      console.log(e);
      toast({
        title: 'Ошибка!',
        description: 'Пользователь не был удален',
      });
    }
  };

  return (
    <div className={'w-full h-full flex gap-10'}>
      <div className={'flex-1 h-full border border-primary rounded-xl p-4'}>
        <h2 className={'text-xl text-center'}>Пользователи</h2>
        <Tabs defaultValue="all" className="mx-auto flex justify-center items-center flex-col gap-5 w-full">
          <TabsList className={'flex gap-6'}>
            <TabsTrigger value="all" onClick={() => setChoosedTab('all')}>
              Все
            </TabsTrigger>
            <TabsTrigger value="patients" onClick={() => setChoosedTab('patients')}>
              Пациенты
            </TabsTrigger>
            <TabsTrigger value="employees" onClick={() => setChoosedTab('employees')}>
              Сотрудники
            </TabsTrigger>
          </TabsList>
          <div className={'w-full'}>
            {users && (
              <DataTable
                columns={getColumns((id: number) => dispatch(adminStore.actions.openUserInfo(id)), onDeleteUser)}
                data={users}
              />
            )}
          </div>
        </Tabs>
      </div>

      <div className={'flex-1 h-full border border-primary rounded-xl p-4'}>
        <CreateUser />
        <hr className={'mt-5'} />
        <div className={'relative w-full h-full'}>
          <UserInfoComponent />
        </div>
      </div>
    </div>
  );
};
