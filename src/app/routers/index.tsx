import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';
import { PublicLayout } from '../layouts/public';
import { AuthorizeSSO } from '@/features/auth/components/authorize-sso';

export const routers = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: '/login',
            lazy: async () => {
              const { LoginForm } = await import(
                '@/features/auth/components/login-form'
              );
              return { Component: LoginForm };
            }
          }
        ]
      }
    ]
  },
  {
    path: '/authorize/sso',
    element: <AuthorizeSSO />
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        lazy: async () => {
          const { SystemLayout } = await import('@/app/layouts/system');
          return { Component: SystemLayout };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { LeadsPage } = await import(
                '@/features/leads/pages/leads-page'
              );
              return { Component: LeadsPage };
            }
          },
          {
            path: 'relatorios',
            lazy: async () => {
              const { ReportsPage } = await import('@/features/reports/pages');
              return { Component: ReportsPage };
            }
          },
          {
            path: 'importacoes',
            lazy: async () => {
              const { ImportsPage } = await import('@/features/imports/pages');
              return { Component: ImportsPage };
            }
          },
          {
            path: 'clientes',
            lazy: async () => {
              const { CustomersPage } = await import(
                '@/features/customers/pages'
              );
              return { Component: CustomersPage };
            }
          },
          {
            path: 'leads',
            lazy: async () => {
              const { LeadsPage } = await import(
                '@/features/leads/pages/leads-page'
              );
              return { Component: LeadsPage };
            }
          }
        ]
      }
    ]
  }
]);

export function AppRouters() {
  return <RouterProvider router={routers} />;
}
