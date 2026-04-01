import {
  ClipboardMinus,
  LayoutDashboard,
  Upload,
  Users
} from 'lucide-react';
import type { NavItem } from './nav-items';

export const Navlinks: NavItem[] = [
  {
    title: 'Leads',
    url: '/leads',
    icon: LayoutDashboard
  },
  {
    title: 'Clientes',
    url: '/clientes',
    icon: Users
  },
  {
    title: 'Importações',
    url: '/importacoes',
    icon: Upload
  },
  {
    title: 'Relatórios',
    url: '/relatorios',
    icon: ClipboardMinus
  },
];
