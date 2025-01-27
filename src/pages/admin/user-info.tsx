import { FC, useEffect } from 'react';
import { useGetUserQuery } from '@/entities/user/api.ts';
import { useAppDispatch, useAppSelector } from '@/lib/redux.ts';
import { adminStore } from '@/entities/admin/store.ts';
import { cn } from '@/lib/utils.ts';
import { Loader, User } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Gender, GenderUsages, Role } from '@/entities/user/types.ts';

interface UserInfoProps {
  className?: string;
}

const morphWords: Record<Role, string> = {
  [Role.Patient]: 'пациенте',
  [Role.Doctor]: 'враче',
  [Role.Medregistrator]: 'медрегистраторе',
  [Role.Admin]: 'администраторе',
};

const patientCols = {
  birthdate: 'Дата рождения',
  address: 'Адрес',
  phone_number: 'Номер телефона',
  email: 'Эл. почта',
  gender: 'Пол',
};

const formatPatientInfo = (key: string, value: string | null): string | null => {
  if (key === 'birthdate' && value) return new Date(value).toLocaleDateString();
  if (key === 'gender' && value) return GenderUsages[value as Gender];
  return value;
};

const renderPatientInfo = (patientInfo: Record<string, string | null>) => {
  return Object.entries(patientCols).map(([key, label]) => {
    const preparedValue = formatPatientInfo(key, patientInfo[key]);
    return (
      <p key={key}>
        {label}: {preparedValue}
      </p>
    );
  });
};

export const UserInfo: FC<UserInfoProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { userId, userShowed } = useAppSelector(adminStore.selectors.userInfo);
  const { data, isLoading } = useGetUserQuery({ id: userId as number }, { skip: !userId });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (!userShowed)
    return (
      <div className={'flex items-center justify-center p-10'}>
        Нажмите на <User />, чтобы отобразить информацию о пользователе
      </div>
    );

  return (
    <div className={cn('relative flex flex-col gap-4', className)}>
      <Button className="absolute right-2 top-2" onClick={() => dispatch(adminStore.actions.closeUserInfo())}>
        Закрыть
      </Button>

      {isLoading ? (
        <Loader className="animate-spin" />
      ) : data ? (
        <>
          <h2>
            Данные о {morphWords[data.userInfo.role]} {data.userInfo.userName}
          </h2>
          <p className="text-foreground">
            ФИО: {[data.userInfo.last_name, data.userInfo.first_name, data.userInfo.patronymic ?? ''].join(' ')}
          </p>
          {data.userInfo.role === Role.Patient &&
            renderPatientInfo(data.patientInfo! as unknown as Record<string, string | null>)}
          {data.userInfo.role === Role.Medregistrator && <p>Филиал: {data.filialAddress}</p>}
          {data.userInfo.role === Role.Doctor && (
            <>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Опыт работы:</span> {data.doctorInfo!.work_experience} лет
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Филиал:</span> {data.filialAddress ? data.filialAddress : 'Не указан'}
              </p>

              <h2 className="text-xl font-semibold mb-3">Специализации:</h2>
              <ul className="space-y-3">
                {data.doctorInfo!.specializations!.map((specialization) => (
                  <li key={specialization.id} className="border rounded-lg p-4 bg-gray-100 hover:shadow-md transition">
                    <h3 className="text-lg font-medium">{specialization.name}</h3>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <p>Нет данных о пользователе</p>
      )}
    </div>
  );
};
