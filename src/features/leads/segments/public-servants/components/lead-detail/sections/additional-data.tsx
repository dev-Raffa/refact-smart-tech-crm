import { Globe, Database } from 'lucide-react';

import type { LeadDetails } from '@/features/leads/types/lead.model';
import { MarketingBadges } from '@/features/leads/components/badges/marketin';
import { IdField } from '@/features/leads/components/fields/id-field';

export function PublicServantAdditionalDataSection({
  leadDetails
}: {
  leadDetails: LeadDetails;
}) {
  const marketing = leadDetails.marketing;
  const chat = leadDetails.chat;

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-3">
        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
          <Globe className="size-3" /> Dados de Marketing
        </h5>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <MarketingBadges
            marketing={marketing}
            className="flex-row justify-start gap-2"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
          <Database className="size-3" /> IDs de Integração
        </h5>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm space-y-4">
          <IdField
            label="ID do Contato (Huggy)"
            value={chat?.contactId}
            copySuccessText="ID do contato copiado!"
          />
          <IdField
            label="ID do Chat (Huggy)"
            value={chat?.chatId}
            copySuccessText="ID do chat copiado!"
          />
          <IdField
            label="ID da Simulação (Lead ID)"
            value={leadDetails.id}
            copySuccessText="ID da simulação copiado!"
          />
        </div>
      </div>
    </div>
  );
}
