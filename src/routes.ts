import { Role } from '@/entities/user/types.ts';

export const Routes = {
  home: '/',
  auth: '/auth',
  account: '/account',
  [Role.Admin]: '/admin',
  [Role.Doctor]: '/doctor',
  [Role.Patient]: '/patient',
  [Role.Medregistrator]: '/medregistrar',
};
