import { Outlet, Navigate } from 'react-router';
import { useAuthStore } from '@/shared/store';

export const GuestGuard = () => {
  const status = useAuthStore((state) => state.status);

  if (status === 'loading' || status === 'idle') {
    return null;
  }

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
