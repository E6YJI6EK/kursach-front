import React, { FC } from 'react';
import s from './Doctor.module.scss';

interface DoctorProps {
  className?: string;
}

export const DoctorPage: FC<DoctorProps> = (props) => {
  const { className } = props;

  return (
    <div>
      <h1>doctor page</h1>
    </div>
  );
};