import {
  CheckCircle2,
  Wallet,
  Banknote,
  Percent,
  CalendarDays,
  ArrowRightLeft,
  FileEdit
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

import { StatBox } from '@/features/leads/components/fields/stat-box';
import { formatCurrencyBRL } from '@/shared/utils';
import { BankCardShell } from './bank-card-shell';
import type { ApprovedBank } from '../../../types/models';

type ApprovedBankCardProps = {
  bank: ApprovedBank;
  isSelected: boolean;
};

export function ApprovedBankCard({ bank, isSelected }: ApprovedBankCardProps) {
  const badge = isSelected ? (
    <Badge className="bg-green-600 hover:bg-green-700 text-white border-none px-2 py-0.5 h-6 text-[10px] font-semibold shadow-none">
      <CheckCircle2 className="size-3 mr-1.5" />
      Selecionado
    </Badge>
  ) : null;

  const footer = isSelected ? (
    <Button
      variant="outline"
      size="sm"
      className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary h-9 font-medium"
    >
      <FileEdit className="size-4" />
      Editar Proposta
    </Button>
  ) : (
    <div className="flex gap-2 w-full">
      <Button
        variant="default"
        size="sm"
        className="flex-1 gap-1.5 text-xs h-9 font-medium shadow-sm bg-red-700 hover:bg-red-800 text-white border-none"
      >
        <ArrowRightLeft className="size-3.5" />
        Selecionar Banco
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 shrink-0"
        title="Editar Simulação"
      >
        <FileEdit className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );

  return (
    <BankCardShell bankName={bank.name} badge={badge} footer={footer}>
      <div className="flex flex-col gap-1 p-3 bg-white/60 dark:bg-black/20 rounded-md border border-zinc-100 dark:border-zinc-800/50">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wallet className="size-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            Valor Liberado
          </span>
        </div>
        <span className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-tight">
          {formatCurrencyBRL(bank.releasedAmount)}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatBox
          label="Prazo"
          value={`${bank.installmentTerm}x`}
          icon={<CalendarDays className="size-3" />}
        />
        <StatBox
          label="Parcela"
          value={formatCurrencyBRL(bank.installmentAmount)}
          icon={<Banknote className="size-3" />}
        />
        <StatBox
          label="Taxa"
          value={`${bank.interestRate?.toFixed(2)}%`}
          icon={<Percent className="size-3" />}
        />
      </div>
    </BankCardShell>
  );
}
