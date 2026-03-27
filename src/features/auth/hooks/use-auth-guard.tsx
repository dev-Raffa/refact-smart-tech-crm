import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/features/auth/store';
import { authService } from '@/features/auth/services';
import { toast } from 'sonner';

export const useAuthGuard = () => {
  const { status, expiresAt, logout } = useAuthStore();
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    if (!expiresAt) return;
    hasWarnedRef.current = false;

    const timeUntilWarning = (expiresAt - Date.now()) - (5 * 60 * 1000);
    
    if (timeUntilWarning <= 0) return;

    const timeoutId = setTimeout(() => {
      toast.warning('Sua sessão expira em 5 minutos', {
        description: 'Salve seu trabalho ou sua sessão será encerrada automaticamente.'
      });
      hasWarnedRef.current = true;
    }, timeUntilWarning);

    return () => clearTimeout(timeoutId);
  }, [expiresAt]);
  useEffect(() => {
    const isValid = authService.isSessionValid(expiresAt);

    if (!isValid && status === 'authenticated') {
      toast.error('Sua sessão expirou', {
        description: 'Por favor, faça login novamente para continuar.'
      });
      logout();
    }
  }, [expiresAt, logout, status]);

  useEffect(() => {
    const handleServerSessionExpired = () => {
      toast.error('Sua sessão expirou', {
        description: 'Sua autenticação foi rejeitada pelo servidor. Faça login novamente.'
      });
    };

    window.addEventListener('on-session-expired', handleServerSessionExpired);
    return () => window.removeEventListener('on-session-expired', handleServerSessionExpired);
  }, []);

  return { status };
};