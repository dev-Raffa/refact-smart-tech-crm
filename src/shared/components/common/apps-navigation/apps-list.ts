import {
  BookText,
  ChartNoAxesColumnIcon,
  LayoutDashboard,
  Search
} from 'lucide-react';

export const apps = [
  {
    name: 'CRM',
    description: 'Sistema de gestão de relacionamento',
    icon: ChartNoAxesColumnIcon,
    href: `https://crm.gruposmartconsig.com.br`,
    active: true
  },
  {
    name: 'Simulações',
    description: 'Sistema de simulações',
    icon: Search,
    href: `https://simulacoes.gruposmartconsig.com.br`,
    active: false
  },
  {
    name: 'Administração',
    description: 'Sistema de administração',
    icon: LayoutDashboard,
    href: `https://admin.gruposmartconsig.com.br`,
    active: false
  },
  {
    name: 'Formalização',
    description: 'Sistema de formalização',
    icon: BookText,
    href: `https://formalizacao.gruposmartconsig.com.br`,
    active: false
  }
];
