import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '@/components/widgets/header.tsx';
import { useInitQuery } from '@/entities/user/api.ts';
import { Routes } from '@/routes.ts';
import { RoleUsages } from '@/entities/user/types.ts';

export const WorkflowTemplate = () => {
  const { data } = useInitQuery();
  if (!data) return <Navigate to={Routes.auth} />;
  return (
    <div className={'pt-[15vh]'}>
      <Header title={RoleUsages[data.role]} />
      <ScrollArea>
        <div className={'min-h-[85vh] p-6 bg-background'}>
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
};
