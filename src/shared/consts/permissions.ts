import type { AppTeams, PermissionAction } from '../types/permissions';

export const CLT_PERMISSIONS: PermissionAction[] = [
  'clt:view',
  'clt:create',
  'clt:edit',
  'clt:delete',
  'clt:detail',
  'clt:manage'
];

export const SERVANTS_PERMISSIONS: PermissionAction[] = [
  'Servants:view',
  'Servants:create',
  'Servants:edit',
  'Servants:delete',
  'Servants:detail',
  'Servants:manage'
];

export const ADMIN_PERMISSIONS: PermissionAction[] = [
  'clt:view',
  'clt:create',
  'clt:edit',
  'clt:delete',
  'clt:detail',
  'clt:manage',
  'Servants:view',
  'Servants:create',
  'Servants:edit',
  'Servants:delete',
  'Servants:detail',
  'Servants:manage'
];

export const Role_Permissions: Record<AppTeams, PermissionAction[]> = {
  '/Time CLT': CLT_PERMISSIONS,
  '/TIME ALFA': SERVANTS_PERMISSIONS,
  '/TIME FÊNIX': SERVANTS_PERMISSIONS,
  '/TIME THÉMIS': SERVANTS_PERMISSIONS,
  '/TIME TITÃ': SERVANTS_PERMISSIONS,
  '/TIME ZION': SERVANTS_PERMISSIONS,
  '/Admin': ADMIN_PERMISSIONS,
  '/Administradores': ADMIN_PERMISSIONS
};
