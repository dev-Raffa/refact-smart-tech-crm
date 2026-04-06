import { maskDocument } from '@/shared/utils/masks/mask-document';
import { maskPhone } from '@/shared/utils/masks/mask-phone';
import type { LeadDetails } from '../../../../types/lead.model';
import { MarketingBadges } from '../../../marketing-badges';
import { CopyButton } from '@/shared/components/global/copy-button';

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
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 mt-2 space-y-3 text-sm bg-zinc-50 dark:bg-zinc-900">
      <div className="space-y-1">
        <p>
          <strong className="text-zinc-900 dark:text-zinc-200">Nome:</strong>{' '}
          {customer.name}
        </p>
        <p className="flex items-center gap-1">
          <strong className="text-zinc-900 dark:text-zinc-200">CPF:</strong>{' '}
          {maskDocument(customer.cpf)}
          <CopyButton
            successText="CPF Copiado!"
            errorText="Este lead não possui um CPF cadastrado."
            copy={maskDocument(customer.cpf)}
          />
        </p>
        <p className="flex items-center gap-1">
          <strong className="text-zinc-900 dark:text-zinc-200">
            Telefone:
          </strong>{' '}
          <div className="flex items-center gap-1">
            {typeof customer.phoneNumbers === 'string'
              ? customer.phoneNumbers
              : maskPhone(customer.phoneNumbers[0])}
            <CopyButton
              successText="Telefone Copiado!"
              errorText="Este lead não possui um telefone cadastrado."
              copy={
                typeof customer.phoneNumbers === 'string'
                  ? customer.phoneNumbers
                  : maskPhone(customer.phoneNumbers[0])
              }
            />
          </div>
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <strong className="text-zinc-900 dark:text-zinc-200">Marketing:</strong>
        <MarketingBadges marketing={marketing} className="flex-row " />
      </div>
      <p>
        <strong className="text-zinc-900 dark:text-zinc-200">
          ID Simulação:
        </strong>{' '}
        <span className="break-all font-mono text-xs ml-1">{leadId}</span>
      </p>

      {chat && (
        <div>
          <p className="flex gap-1 items-center text-sm">
            <span>Contato ID:</span>{' '}
            <span className="font-mono">{chat.contactId || '-'}</span>
          </p>
          <p className="flex gap-1 items-center text-sm">
            <span>Chat ID:</span>{' '}
            <div className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              {chat.chatId}
              <CopyButton
                successText="Chat ID Copiado!"
                errorText="Este lead não possui um Chat ID cadastrado."
                copy={chat.chatId}
              />
            </div>
          </p>
        </div>
      )}
    </div>
  );
}
