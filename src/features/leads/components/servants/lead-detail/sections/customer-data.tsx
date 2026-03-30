import { maskDocument } from '@/shared/utils/masks/mask-document';
import { maskPhone } from '@/shared/utils/masks/mask-phone';
import type { LeadDetails } from '../../../../types/lead.model';
import { MarketingBadges } from '../../../marketing-badges';

export function CustomerDataSection({
  leadDetails,
  leadId
}: {
  leadDetails: LeadDetails;
  leadId: string;
}) {
  const customer = leadDetails.customer;
  const marketing = leadDetails.marketing;
  const chat = leadDetails.chat;

  return (
    <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 mt-2">
      <div className="space-y-1">
        <p>
          <strong className="text-zinc-900 dark:text-zinc-200">Nome:</strong>{' '}
          {customer.name}
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-zinc-200">CPF:</strong>{' '}
          {maskDocument(customer.cpf)}
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-zinc-200">
            Telefone:
          </strong>{' '}
          {typeof customer.phoneNumbers === 'string'
            ? customer.phoneNumbers
            : maskPhone(customer.phoneNumbers[0])}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <strong className="text-zinc-900 dark:text-zinc-200">Marketing:</strong>
        <MarketingBadges marketing={marketing} />
      </div>
      <p>
        <strong className="text-zinc-900 dark:text-zinc-200">
          ID Simulação:
        </strong>{' '}
        <span className="break-all font-mono text-xs ml-1">{leadId}</span>
      </p>

      {chat && (
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 space-y-2">
          <strong className="text-zinc-900 dark:text-zinc-200 block">
            Detalhes do Chat
          </strong>
          <p className="flex justify-between items-center text-xs">
            <span>Contato ID:</span>{' '}
            <span className="font-mono">{chat.contactId || '-'}</span>
          </p>
          <p className="flex justify-between items-center text-xs">
            <span>Chat ID:</span>{' '}
            <span className="font-mono">{chat.chatId || '-'}</span>
          </p>
        </div>
      )}
    </div>
  );
}
