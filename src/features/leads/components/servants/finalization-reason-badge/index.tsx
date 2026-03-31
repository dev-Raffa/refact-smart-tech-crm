import { Badge } from '@/shared/components/ui/badge';
import { LeadBadgeColors } from '@/features/leads/consts/badge-colors';
import  {LeadFinalizationReasons, type LeadFinalizationReason } from '@/features/leads/consts/finalization-reasons';

type PublicServantFinalizationReasonBadgeProps = {
 finalizationReason: LeadFinalizationReason;
};

export function PublicServantFinalizationReasonBadge({
  finalizationReason
}: PublicServantFinalizationReasonBadgeProps) {
    return (
      <Badge className={`gap-1 border-none shadow-none text-[10px] px-1.5 py-0 h-4 ${LeadBadgeColors.DANGER}`}>
        {LeadFinalizationReasons[finalizationReason]}
      </Badge>
    );
}