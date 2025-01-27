import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/routes.ts';
import { useAppSelector } from '@/lib/redux.ts';
import { userStore } from '@/entities/user/store.ts';
import { useInitQuery } from '@/entities/user/api.ts';

export const ForUnknownTemplate = () => {
  const accessToken = useAppSelector(userStore.selectors.accessToken);
  const { data, isError, isSuccess } = useInitQuery();
  if (isSuccess) {
    return <Navigate to={Routes.account + Routes[data!.role]} replace />;
  }
  return <Outlet />;
  // console.log(isSuccess);

  // if (isError) {
  //   return <Outlet />;
  // }
};
