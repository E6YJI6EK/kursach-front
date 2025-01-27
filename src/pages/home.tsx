import { useGetOrgInfoQuery } from '@/entities/common/api.ts';
import { Header } from '@/components/widgets/header.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { useGetDoctorsQuery } from '@/entities/admin/api.ts';

export const HomePage = () => {
  const { data } = useGetOrgInfoQuery({ id: import.meta.env.VITE_ORGANIZATION_ID });

  return (
    data && (
      <div className={'pt-[15vh]'}>
        <Header title={data.org.org_name} />
        <ScrollArea>
          <div className={'min-h-[85vh] p-6 bg-background'}>
            {/* Description Section */}
            <section className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold mb-4">О "{data.org.org_name}"</h2>
              <p className="text-lg leading-relaxed">{data.org.org_description}</p>
            </section>

            {/* Services Section */}
            <section className="bg-gray-100 py-8">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-4">Наши услуги</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.services.map((service) => (
                    <li key={service.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                      <h3 className="text-lg font-medium">{service.name}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold mb-4">Наши специалисты</h2>
              <DoctorTable />
            </section>
            {/* Branches Section */}
            <section className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-semibold mb-4">Контакты</h2>
              <div className="space-y-4">
                {data.org.filials.map((branch) => (
                  <div key={branch.filial_id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="text-lg font-medium">{branch.address}</h3>
                    <p className="text-gray-600">{branch.phone_number}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Section */}
          </div>
          <footer className="bg-primary text-white py-4">
            <div className="container mx-auto px-4 text-center">
              <p>
                &copy; {new Date().getFullYear()} {data.org.org_name}. Все права защищены.
              </p>
            </div>
          </footer>
        </ScrollArea>
      </div>
    )
  );
};

const DoctorTable: React.FC = () => {
  const { doctors } = useGetDoctorsQuery(undefined, {
    selectFromResult: (state) => {
      return {
        doctors: state.data,
      };
    },
  });
  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ФИО</th>
            <th className="border border-gray-300 p-2">Специализация</th>
            <th className="border border-gray-300 p-2">Стаж</th>
          </tr>
        </thead>
        <tbody>
          {doctors &&
            doctors.map((doctor) => (
              <tr key={doctor.doctor_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  {`${doctor.user.last_name} ${doctor.user.first_name} ${doctor.user.patronymic}`}
                </td>
                <td className="border border-gray-300 p-2">
                  {doctor.specializations.map((spec) => spec.name).join(', ')}
                </td>
                <td className="border border-gray-300 p-2">{doctor.work_experience} лет</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
