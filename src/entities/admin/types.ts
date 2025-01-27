export type Filial = {
  filial_id: number;
  address: string;
  phone_number: string;
};

interface User {
  user_id: number;
  last_name: string;
  first_name: string;
  patronymic: string;
  userName: string;
  password: string;
  role: string;
}

interface Specialization {
  id: number;
  name: string;
  doctors: {
    doctor_id: number;
    work_experience: number;
  }[];
}

export interface Doctor {
  doctor_id: number;
  work_experience: number;
  user: User;
  specializations: Specialization[];
}
