import { LogIn, LogOut } from 'lucide-react';
import { useInitQuery, userApiSlice } from '@/entities/user/api.ts';
import { userStore } from '@/entities/user/store.ts';
import { useAppDispatch } from '@/lib/redux.ts';
import { Link, useNavigate } from 'react-router';
import { Routes } from '@/routes.ts';

interface IHeaderProps {
  title: string;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const { title } = props;
  const { data } = useInitQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className={'fixed h-[15vh] top-0 inset-x-0 bg-primary flex items-center justify-center p-6'}>
      <h1 className={'text-primary-foreground text-center'}>{title}</h1>
      {data ? (
        <div
          onClick={() => {
            localStorage.setItem('accessToken', '');
            dispatch(userStore.actions.resetUserState());
            dispatch(userApiSlice.util.invalidateTags(['User']));
            navigate(Routes.auth);
          }}
          className={'cursor-pointer absolute right-6 flex gap-3 ml-auto text-background'}
        >
          Выйти
          <LogOut />
        </div>
      ) : (
        <Link to={Routes.auth}>
          <div className={'cursor-pointer absolute right-6 flex gap-3 ml-auto text-background'}>
            Войти
            <LogIn />
          </div>
        </Link>
      )}
    </div>
  );
};
