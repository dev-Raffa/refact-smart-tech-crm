import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { SuspenseLoading } from '@/shared/components/common/suspense-loading';
import { UseAuthorizeSSO } from '../../hooks/use-mutations';

export function AuthorizeSSO() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync } = UseAuthorizeSSO();

  useEffect(() => {
    const token = searchParams.get('token');

    const registerToken = async (token: string) => {
      await mutateAsync({ accessToken: token });
    };

    if (token) {
      registerToken(token);
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate, mutateAsync]);

  return <SuspenseLoading />;
}
