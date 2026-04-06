import { maskDocument, maskZipCode, formatDateOnly } from '@/shared/utils';
import { maskPhone } from '@/shared/utils/masks/mask-phone';

import type { LeadDetails } from '../../../../types/lead.model';
import { CopyButton } from '@/shared/components/global/copy-button';
import { Badge } from '@/shared/components/ui/badge';

function formatGender(gender?: string) {
  if (!gender) return 'NÃO INFORMADO';
  const g = gender.toUpperCase();
  if (g.startsWith('M')) return 'MASC';
  if (g.startsWith('F')) return 'FEM';
  return g;
}

export function CltCustomerData({ leadDetails }: { leadDetails: LeadDetails }) {
  const customer = leadDetails.customer;
  const facta = leadDetails.facta;
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

      {facta && (facta.formalizationCode || facta.formalizationLink) && (
        <>
          <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Formalização (Facta)
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facta.formalizationCode && (
                <DataField
                  label="Código"
                  value={facta.formalizationCode}
                  copyValue={facta.formalizationCode}
                  copySuccessText="Código de formalização copiado!"
                />
              )}
              {facta.formalizationLink && (
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">
                    Link
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={
                        facta.formalizationLink.startsWith('http')
                          ? facta.formalizationLink
                          : `https://${facta.formalizationLink}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-emerald-600 hover:underline truncate max-w-[200px]"
                    >
                      Acessar Link
                    </a>
                    <CopyButton
                      copy={facta.formalizationLink}
                      successText="Link copiado!"
                      errorText="Falha ao copiar link"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DataField({
  label,
  value,
  copyValue,
  copySuccessText,
  renderValue
}: {
  label: string;
  value?: string | null;
  copyValue?: string | null;
  copySuccessText?: string;
  renderValue?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {renderValue ? (
          renderValue
        ) : (
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {value || 'Não informado'}
          </p>
        )}
        {copyValue && value && value !== 'Não informado' && (
          <CopyButton
            copy={copyValue}
            successText={copySuccessText || 'Copiado!'}
            errorText="Falha ao copiar"
          />
        )}
      </div>
    </div>
  );
}
