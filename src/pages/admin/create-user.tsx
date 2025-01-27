import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { CalendarIcon, Loader, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateUserMutation, useInitQuery } from '@/entities/user/api.ts';
import { Gender, Role } from '@/entities/user/types.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast.ts';
import { useGetDoctorSpecsQuery, useGetFilialsQuery } from '@/entities/admin/api.ts';
import FileUpload from '@/components/widgets/file-upload.tsx';

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  patronymic: z.string().min(2).max(50).optional(),
  username: z.string().min(4).max(20),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
  filialId: z.number().optional(),
  organizationId: z.number(),
  patientData: z.object({
    birthdate: z.date(),
    address: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    gender: z.nativeEnum(Gender),
  }),
  doctorData: z.object({
    specializationId: z.number(),
    workExperience: z.number(),
    documentsLinks: z.array(z.object({ name: z.string(), link: z.string() })),
  }),
});

export const CreateUser = () => {
  const { data } = useInitQuery();
  const { toast } = useToast();
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: undefined,
  });
  const role = form.watch('role');
  const { data: filials } = useGetFilialsQuery();
  const { data: doctorSpecs } = useGetDoctorSpecsQuery();
  const [open, setOpen] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUser({ ...values, organizationId: data!.organizationId });
  }

  useEffect(() => {
    if (filials) {
      console.log(filials);
    }
  }, [filials]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast({
        title: 'Успешно!',
        description: 'Пользователь был успешно добавлен',
      });
    }
  }, [isSuccess, toast]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={'flex justify-between text-primary-foreground'}>
        <PlusIcon /> Добавить пользователя
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление пользователя</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-8'}>
            <ScrollArea classNameViewport={'max-h-[500px] flex flex-col gap-8'}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите фамилию" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patronymic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Отчество</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите отчество (если имеется)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Логин</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите логин" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder="Введите пароль" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Роль</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите роль пользователя" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className={'cursor-pointer'} value={Role.Medregistrator}>
                          Медрегистратор
                        </SelectItem>
                        <SelectItem className={'cursor-pointer'} value={Role.Patient}>
                          Пациент
                        </SelectItem>
                        <SelectItem className={'cursor-pointer'} value={Role.Doctor}>
                          Врач
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {role === Role.Patient && (
                <>
                  <FormField
                    control={form.control}
                    name="patientData.gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пол</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите пол" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem className={'cursor-pointer'} value={Gender.male}>
                              Мужской
                            </SelectItem>
                            <SelectItem className={'cursor-pointer'} value={Gender.female}>
                              Женский
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientData.birthdate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Дата рождения</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? format(field.value, 'PPP') : <span>Выберите дату</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientData.phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Номер телефона</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите номер телефона" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientData.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Эл. почта</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите почту" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientData.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Адрес</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите адрес" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {role === Role.Doctor && (
                <>
                  <FormField
                    control={form.control}
                    name="filialId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Филиал</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите филиал" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filials &&
                              filials.map((filial) => (
                                <SelectItem className={'cursor-pointer'} value={filial.filial_id.toString()}>
                                  {filial.address}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="doctorData.workExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Стаж работы</FormLabel>
                        <FormControl>
                          <Input type={'number'} placeholder="Введите стаж работы" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="doctorData.specializationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Специализация</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите специлизацию" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {doctorSpecs &&
                              doctorSpecs.map((spec) => (
                                <SelectItem className={'cursor-pointer'} value={spec.id.toString()}>
                                  {spec.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FileUpload
                    id={'1'}
                    type={'doctors'}
                    onUpload={(path: string, filename: string) => {
                      form.setValue('doctorData.documentsLinks', [{ link: path, name: filename }]);
                    }}
                  />
                </>
              )}
              {role === Role.Medregistrator && (
                <>
                  <FormField
                    control={form.control}
                    name="filialId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Филиал</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите филиал" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filials &&
                              filials.map((filial) => (
                                <SelectItem className={'cursor-pointer'} value={filial.filial_id.toString()}>
                                  {filial.address}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </ScrollArea>
            <div className="flex gap-4">
              <Button type="submit">{isLoading && <Loader className={'animate-spin'} />}Создать</Button>
              <Button type="reset" onClick={() => form.reset()} variant={'secondary'}>
                Очистить
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
