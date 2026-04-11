import { Clock } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import type { LeadLastFlow } from '@/features/leads/types/lead.model';
import { LeadBadgeColors } from '@/features/leads/consts/badge-colors';

type FlagsBadgeProps = {
  lastFlow: LeadLastFlow;
};

export function FlagsBadge({ lastFlow }: FlagsBadgeProps) {
  const badgeClasses = `gap-1 border-none shadow-none text-[10px] px-1.5 py-0 h-4 ${LeadBadgeColors.MUTED}`;

  if (lastFlow.cadence !== 'None') {
    return (
      <Badge className={badgeClasses}>
        <Clock /> Em cadência
      </Badge>
    );
  }

  if (lastFlow.needsHumanHelp && !lastFlow.receivingAssistance) {
    return <Badge className={badgeClasses}>Precisa de ajuda humana</Badge>;
  }

  return null;
}
