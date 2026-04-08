import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/components/ui/form';
import { useLogin } from '../../hooks/use-mutations';
import { loginFormSchema, type LoginFormSchema } from './schema';
import { LoginHeader } from './header';
import { CredentialsFields } from './credentials';
import { LoginTermsAndServices } from './terms-and-services';
import { formDraftService } from '@/shared/services/form-draft';
import { SubmitingButton } from '@/shared/components/common/submiting-button';

export function LoginForm() {
  const { mutateAsync: login, isPending } = useLogin();

  const draft = formDraftService.get<LoginFormSchema>('login');

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      tenant: draft?.tenant || '',
      username: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormSchema) => {
    login({
      username: data.username,
      password: data.password,
      tenant: data.tenant
    });

    data.password = '********';
    formDraftService.write('login', data);
  };

  return (
    <Form {...form}>
      <div className={'max-w-sm mx-auto relative z-50 flex flex-col gap-6'}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <LoginHeader />
            <div className="flex flex-col gap-6">
              <CredentialsFields form={form} />
              <SubmitingButton
                label="Acessar"
                state={isPending}
                className="bg-red-700 text-white font-bold hover:bg-red-800"
              />
            </div>
          </div>
        </form>
        <LoginTermsAndServices />
      </div>
    </Form>
  );
}
