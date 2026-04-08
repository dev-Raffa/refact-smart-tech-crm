import { useCallback } from 'react';
import { useAuthStore } from '@/shared/store';
import type { AppTeams, PermissionAction } from '@/shared/types/permissions';
import { checkPermission } from '@/shared/utils/check-permissions';

export function usePermission() {
  const { user } = useAuthStore();

  const roles = user?.roles;

  const can = useCallback(
    (action: PermissionAction) => {
      if (!roles) {
        return false;
      }

      return checkPermission(roles as AppTeams[], action);
    },
    [roles]
  );

  return {
    can,
    roles,
    isLoading: !roles
  };
}
