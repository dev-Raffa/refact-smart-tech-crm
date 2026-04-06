import { Building2 } from 'lucide-react';

import type { LeadCltDetails } from '../../../../types/lead.model';
import { formatCurrencyBRL, formatDateOnly } from '@/shared/utils';

type CltDataSectionProps = {
  cltDetails?: LeadCltDetails;
};

export function CltDataSection({ cltDetails }: CltDataSectionProps) {
  if (
    !cltDetails ||
    !cltDetails.companies ||
    cltDetails.companies.length === 0
  ) {
    return (
      <div className="text-center py-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Nenhuma informação profissional disponível.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-2 gap-4">
          <StatField
            label="Admissão"
            value={formatDateOnly(cltDetails.employmentStartDate || '')}
          />
          <StatField
            label="Tempo de Empresa"
            value={
              cltDetails.employmentDuration
                ? `${cltDetails.employmentDuration} meses`
                : 'Indisponível'
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatField
            label="Margem"
            value={formatCurrencyBRL(cltDetails.marginAvailable || 0)}
            highlight
          />
          <StatField
            label="Rendimentos"
            value={formatCurrencyBRL(cltDetails.totalEarnings || 0)}
            highlight
          />
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
          Empresas / Vínculos
        </h5>
        {cltDetails.companies.map((company, index) => (
          <div
            key={`${company.cnpj}-${index}`}
            className="space-y-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {company.name}
                </span>
                <p className="text-[10px] text-zinc-500 font-medium">
                  CNPJ: {company.cnpj || '-'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div className="col-span-1">
                <DataField label="Matrícula" value={company.registration} />
              </div>
              <div className="col-span-1">
                <DataField
                  label="Admissão"
                  value={formatDateOnly(company.admissionDate || '')}
                />
              </div>
              <div className="col-span-1">
                <DataField
                  label="Salário"
                  value={formatCurrencyBRL(company.salary)}
                  primary
                />
              </div>
              <div className="col-span-1">
                <DataField
                  label="Idade da Empresa"
                  value={calculateCompanyAge(company.foundationDate)}
                />
              </div>
              <div className="col-span-1">
                <DataField
                  label="Nº de Funcionários"
                  value={company.workersCount?.toString()}
                />
              </div>
              <div className="col-span-1">
                <DataField label="Código CNAE" value={company.cnaeCode} />
              </div>
            </div>

            {company.cnaeDescription && (
              <div className="pt-2 border-t border-zinc-50 dark:border-zinc-900">
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-tight">
                  Descrição CNAE
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed italic">
                  "{company.cnaeDescription}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateCompanyAge(foundationDate?: string) {
  if (!foundationDate) return 'Indisponível';
  const foundation = new Date(foundationDate);
  const today = new Date();
  let age = today.getFullYear() - foundation.getFullYear();
  const m = today.getMonth() - foundation.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < foundation.getDate())) {
    age--;
  }
  return `${age} anos`;
}

function StatField({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tight">
        {label}
      </span>
      <p
        className={`text-sm font-bold ${highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-800 dark:text-zinc-200'}`}
      >
        {value}
      </p>
    </div>
  );
}

function DataField({
  label,
  value,
  primary = false
}: {
  label: string;
  value?: string;
  primary?: boolean;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tight">
        {label}
      </span>
      <p
        className={`text-xs ${primary ? 'font-bold text-red-700 dark:text-red-500' : 'font-semibold text-zinc-700 dark:text-zinc-300'}`}
      >
        {value || 'Não informado'}
      </p>
    </div>
  );
}
