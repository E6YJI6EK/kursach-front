import { useLoginMutation } from '@/entities/auth/api.ts';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router';
import { Routes } from '@/routes.ts';
import { useAppDispatch } from '@/lib/redux.ts';
import { userApiSlice } from '@/entities/user/api.ts';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

export const AuthPage = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    const res = await login({ username, password }).unwrap();
    dispatch(userApiSlice.util.invalidateTags(['User']));
    navigate(Routes.account + `/${res.user.role}`);
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border p-6 rounded-xl border-border">
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
                  <Input placeholder="Введите пароль" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </div>
  );
};
