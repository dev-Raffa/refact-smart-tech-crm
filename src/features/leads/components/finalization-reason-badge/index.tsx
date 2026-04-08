import { Badge } from '@/shared/components/ui/badge';
import { LeadBadgeColors } from '@/features/leads/consts/badge-colors';

type FinalizationReasonBadgeProps = {
  finalizationReason: string;
};

export function FinalizationReasonBadge({
  finalizationReason
}: FinalizationReasonBadgeProps) {
  if (!finalizationReason || finalizationReason === 'Nenhum') return null;
  return (
    <Badge
      className={`gap-1 border-none shadow-none text-[10px] px-1.5 py-0 h-4 ${LeadBadgeColors.DANGER}`}
    >
      {finalizationReason}
    </Badge>
  );
}
