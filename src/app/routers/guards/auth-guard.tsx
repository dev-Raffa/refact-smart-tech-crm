import { useAuthGuard } from '@/features/auth/hooks/use-auth-guard';
import { Outlet, useLocation, Navigate } from 'react-router';

export const AuthGuard = () => {
  const location = useLocation();
  const { status } = useAuthGuard();

  if (status === 'loading' || status === 'idle') {
    return null;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};