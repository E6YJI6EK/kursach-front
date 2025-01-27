import { User } from '@/entities/user/types.ts';

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};
