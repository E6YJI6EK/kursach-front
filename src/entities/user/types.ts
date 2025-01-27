export enum Role {
  Admin = 'admin',
  Doctor = 'doctor',
  Patient = 'patient',
  Medregistrator = 'medregistrator',
}

export enum Gender {
  male = 'male',
  female = 'female',
}

export const GenderUsages: Record<Gender, string> = {
  [Gender.male]: 'Мужской',
  [Gender.female]: 'Женский',
};

export const RoleUsages: Record<Role, string> = {
  [Role.Admin]: 'Администратор',
  [Role.Doctor]: 'Врач',
  [Role.Medregistrator]: 'Медрегистратор',
  [Role.Patient]: 'Пациент',
};

export type User = {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  organizationId: number;
  filialId: number;
  role: Role;
};

export type PatientData = {
  birthdate: Date;
  address: string;
  phoneNumber: string;
  email: string;
  gender: Gender;
};

export type DoctorData = {
  specializationId: number;
  specializations?: { id: number; name: string }[];
  workExperience: number;
  work_experience?: number;
  documentsLinks: { name: string; link: string }[];
};

export type MedRegistrarData = {
  filialId: string;
};

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  patronymic?: string;
  username: string;
  password: string;
  role: Role;
  filialId?: number;
  organizationId: number;
  patientData?: PatientData;
  doctorData?: DoctorData;
};

export type GetUsersResponse = {
  data: {
    first_name: string;
    last_name: string;
    organization: {
      org_description: string;
      org_id: 1;
      org_name: string;
    };
    patronymic: string;
    role: Role;
    userName: string;
    user_id: number;
  }[];
  page: string;
  total: number;
  totalPages: number;
};

export type UserInfoResponse = {
  userInfo: {
    userId: number;
    userName: string;
    first_name: string;
    last_name: string;
    patronymic: string | null;
    role: Role;
  };
  patientInfo?: PatientData;
  doctorInfo?: DoctorData;
  filialAddress?: string;
};
