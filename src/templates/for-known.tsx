import { useInitQuery } from '@/entities/user/api.ts';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/routes.ts';

export const ForKnownTemplate = () => {
  const { isError, isSuccess } = useInitQuery();

  if (isError) {
    return <Navigate to={Routes.auth} replace />;
  }

  if (isSuccess) {
    return <Outlet />;
  }
};
