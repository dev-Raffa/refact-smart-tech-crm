import { Globe, Database } from 'lucide-react';

import type { LeadDetails } from '../../../../types/lead.model';
import { CopyButton } from '@/shared/components/global/copy-button';
import { MarketingBadges } from '../../../marketing-badges';

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

function IdField({
  label,
  value,
  copySuccessText
}: {
  label: string;
  value?: string;
  copySuccessText: string;
}) {
  return (
    <div className="space-y-1.5 pt-3 first:pt-0 border-t first:border-t-0 border-zinc-50 dark:border-zinc-900">
      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 break-all leading-none">
          {value || 'Não informado'}
        </p>
        {value && (
          <CopyButton
            copy={value}
            successText={copySuccessText}
            errorText="Falha ao copiar ID"
          />
        )}
      </div>
    </div>
  );
}
