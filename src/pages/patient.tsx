import { useAppSelector } from '@/lib/redux.ts';
import { userStore } from '@/entities/user/store.ts';
import { Header } from '@/components/widgets/header.tsx';
import { RoleUsages } from '@/entities/user/types.ts';

export const PatientPage = () => {
  const user = useAppSelector(userStore.selectors.userData);
  if (!user) return null;
  const { role, lastName, firstName } = user;
  return (
    <>
      <Header title={RoleUsages[role]}/>

    </>
  );
};
