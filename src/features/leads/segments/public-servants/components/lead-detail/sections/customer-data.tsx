import { DataField } from '@/features/leads/components/fields/data-field';
import type { LeadDetails } from '@/features/leads/types/lead.model';
import { maskDocument } from '@/shared/utils/masks/mask-document';
import { maskPhone } from '@/shared/utils/masks/mask-phone';

export function CustomerDataSection({
  leadDetails
}: {
  leadDetails: LeadDetails;
}) {
  const customer = leadDetails.customer;

  return (
    <div className="space-y-5 p-1">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="col-span-full">
          <DataField
            label="Nome Completo"
            value={customer.name}
            copyValue={customer.name}
            copySuccessText="Nome copiado!"
          />
        </div>

        <DataField
          label="CPF"
          value={maskDocument(customer.cpf || '')}
          copyValue={customer.cpf}
          copySuccessText="CPF copiado!"
        />

        <DataField
          label="Telefone"
          value={
            typeof customer.phoneNumbers === 'string'
              ? customer.phoneNumbers
              : maskPhone(customer.phoneNumbers[0])
          }
          copyValue={
            typeof customer.phoneNumbers === 'string'
              ? customer.phoneNumbers
              : customer.phoneNumbers[0]
          }
          copySuccessText="Telefone copiado!"
        />
      </div>
    </div>
  );
}
