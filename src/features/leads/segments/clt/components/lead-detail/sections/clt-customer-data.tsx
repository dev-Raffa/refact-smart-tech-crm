import { maskDocument, maskZipCode, formatDateOnly } from '@/shared/utils';
import { maskPhone } from '@/shared/utils/masks/mask-phone';

import { Badge } from '@/shared/components/ui/badge';
import { formatGender } from '@/shared/utils/formaters/format-gender';
import type { LeadDetails } from '@/features/leads/types/lead.model';
import { DataField } from '@/features/leads/components/fields/data-field';

export function CltCustomerData({ leadDetails }: { leadDetails: LeadDetails }) {
  const customer = leadDetails.customer;
  const clt = leadDetails.cltDetails;

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
          label="Data de Nascimento"
          value={formatDateOnly(customer.birthDate || '')}
        />
        <DataField label="Gênero" value={formatGender(customer.gender)} />

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

        <div className="col-span-full">
          <DataField label="Nome da Mãe" value={customer.motherName} />
        </div>

        <DataField
          label="CEP"
          value={maskZipCode(customer.zipCode)}
          copyValue={customer.zipCode}
          copySuccessText="CEP copiado!"
        />

        <DataField
          label="Endereço"
          value={`${customer.city} - ${customer.uf}`}
        />
      </div>

      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <DataField label="Banco do Cliente" value={customer.bank} />
        <DataField
          label="Pagamento em dia útil?"
          value={
            customer.paymentDay === 1
              ? 'Sim'
              : customer.paymentDay === 0
                ? 'Não'
                : 'Não informado'
          }
        />
        <DataField
          label="Elegibilidade"
          renderValue={
            <Badge
              variant={clt?.eligible ? 'default' : 'destructive'}
              className={`h-5 text-[10px] px-2 ${clt?.eligible ? 'bg-emerald-500 hover:bg-emerald-600 border-none' : ''}`}
            >
              {clt?.eligible ? 'ELEGÍVEL' : 'NÃO ELEGÍVEL'}
            </Badge>
          }
        />
      </div>
    </div>
  );
}
