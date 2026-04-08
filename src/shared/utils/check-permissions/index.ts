import type { AppTeams, PermissionAction } from '@/shared/types/permissions';
import { Role_Permissions } from '@/shared/consts/permissions';

export function checkPermission(
  roles: AppTeams[] | undefined,
  action: PermissionAction
): boolean {
  if (!roles) return false;

  const allowedActions = roles.flatMap((role) => Role_Permissions[role] ?? []);

  return allowedActions.includes(action);
}
