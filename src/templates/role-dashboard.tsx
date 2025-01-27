import { Navigate, Route, Routes } from 'react-router-dom';
import { Routes as routes } from '@/routes.ts';
import { useInitQuery } from '@/entities/user/api.ts';
import { WorkflowTemplate } from '@/templates/workflow.tsx';
import { Role } from '@/entities/user/types.ts';
import { AdminPage } from '@/pages/admin';
import { DoctorPage } from '@/pages/doctor.tsx';
import { PatientPage } from '@/pages/patient.tsx';
import { MedregistrarPage } from '@/pages/medregistrar.tsx';

const rolePages = {
  [Role.Admin]: <AdminPage />,
  [Role.Doctor]: <DoctorPage />,
  [Role.Patient]: <PatientPage />,
  [Role.Medregistrator]: <MedregistrarPage />,
};

export const RoleDashboardTemplate = () => {
  const { data } = useInitQuery();
  console.log(data);
  return (
    <Routes>
      <Route element={<WorkflowTemplate />}>
        <Route path={routes[data!.role]} element={rolePages[data!.role]} />
        <Route path="*" element={<Navigate to={routes.account + routes[data!.role]} />} />
      </Route>
    </Routes>
  );
};
