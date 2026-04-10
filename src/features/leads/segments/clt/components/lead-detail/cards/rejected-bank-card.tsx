import { XCircle, ChevronRight, InfoIcon, ArrowRightLeft } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { BankCardShell } from './bank-card-shell';
import type { FailedBank } from '../../../types/models';

type RejectedBankCardProps = {
  bank: FailedBank;
};

export function RejectedBankCard({ bank }: RejectedBankCardProps) {
  const badge = (
    <Badge className="bg-red-600 hover:bg-red-700 text-white border-none px-2 py-0.5 h-6 text-[10px] font-semibold shadow-none">
      <XCircle className="size-3 mr-1.5" />
      Reprovado
    </Badge>
  );

  const footer = (
    <div className="flex gap-2 w-full">
      <Button
        variant="default"
        size="sm"
        className="flex-1 gap-1.5 text-xs h-9 font-medium shadow-sm"
        disabled
      >
        <ArrowRightLeft className="size-3.5" />
        Selecionar Banco
      </Button>
    </div>
  );

  return (
    <BankCardShell bankName={bank.bankFailed} badge={badge} footer={footer}>
      <div className="flex flex-col gap-1 p-3 bg-white/60 dark:bg-black/20 rounded-md border border-zinc-100 dark:border-zinc-800/50">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <InfoIcon className="size-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            Motivos:
          </span>
        </div>
        {bank.reasons.map((reason, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 py-1 text-red-700 dark:text-zinc-300 text-sm"
          >
            <ChevronRight className="size-4 shrink-0" />
            <span className="underline leading-tight">{reason}</span>
          </div>
        ))}
      </div>
    </BankCardShell>
  );
}
