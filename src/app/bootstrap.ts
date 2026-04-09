import { setupHttpClientInterceptors } from '@/infra/api/gateway-api';
import { setupAuthInterceptors } from '@/infra/api/auth-api';
import { useAuthStore } from '@/shared/store';

export const bootstrapApp = () => {
  const getToken = () => useAuthStore.getState().token;

  setupHttpClientInterceptors(getToken, () => {
    const { expiresAt } = useAuthStore.getState();

    if (!expiresAt) {
      window.dispatchEvent(new CustomEvent('on-session-expired'));
      useAuthStore.getState().logout();
      return;
    }

    const TokenExpiresAt = new Date(expiresAt);
    const isExpired = TokenExpiresAt < new Date();

    if (isExpired) {
      window.dispatchEvent(new CustomEvent('on-session-expired'));
      useAuthStore.getState().logout();
    }
  });

  setupAuthInterceptors(getToken);
};
