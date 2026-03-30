import { setupHttpClientInterceptors } from '@/infra/api/gateway-api';
import { setupAuthInterceptors } from '@/infra/api/auth-api';
import { useAuthStore } from '@/features/auth/store';

export const bootstrapApp = () => {
  const getToken = () => useAuthStore.getState().token;

  setupHttpClientInterceptors(getToken, () => {
    const isLoggingOut = useAuthStore.getState().status === 'unauthenticated';
    if (!isLoggingOut) {
      window.dispatchEvent(new CustomEvent('on-session-expired'));
      useAuthStore.getState().logout();
    }
  });

  setupAuthInterceptors(getToken);
};
