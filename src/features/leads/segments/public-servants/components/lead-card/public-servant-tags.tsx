import type { Lead } from '@/features/leads/types/lead.model';
import { Building2, Landmark } from 'lucide-react';

type PublicServantTagsProps = {
  lead: Lead;
};

export function PublicServantTags({ lead }: PublicServantTagsProps) {
  const details = lead.publicServantDetails;

  const detailItems = [
    { label: 'Órgão', value: details.governamentLevel, icon: Landmark },
    {
      label: details.cityHall !== 'Não informado' ? 'Prefeitura' : 'Estado',
      value:
        details.cityHall !== 'Não informado' ? details.cityHall : details.state,
      icon: Building2
    }
  ];

  return (
    <div className="w-full space-y-1.5">
      {detailItems.map((item) => (
        <p
          key={item.label}
          className="text-[11px] leading-tight flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 w-full min-w-0"
        >
          <item.icon className="h-3 w-3 flex-shrink-0" />
          <span className="truncate flex-1 min-w-0">
            {item.label}:{' '}
            <strong className="font-medium text-zinc-900 dark:text-zinc-100">
              {item.value}
            </strong>
          </span>
        </p>
      ))}
    </div>
  );
}
