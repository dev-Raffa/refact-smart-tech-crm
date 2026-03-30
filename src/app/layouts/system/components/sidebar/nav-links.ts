import {
  ClipboardMinus,
  Home,
  LayoutDashboard,
  Upload,
  Users
} from 'lucide-react';
import type { NavItem } from './nav-items';

export const Navlinks: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home
  },
  {
    title: 'Relatórios',
    url: '/relatorios',
    icon: ClipboardMinus
  },
  {
    title: 'Importações',
    url: '/importacoes',
    icon: Upload
  },
  {
    title: 'Clientes',
    url: '/clientes',
    icon: Users
  },
  {
    title: 'Leads',
    url: '/leads',
    icon: LayoutDashboard
  }
];
