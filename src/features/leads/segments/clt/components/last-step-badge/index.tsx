import { Badge } from '@/shared/components/ui/badge';
import type { LeadLastFlowExecutionStatus } from '@/features/leads/types/lead.model';
import { getCltBadgeConfig } from '../../utils/get-clt-badge-config';
import type { LeadCltFlowName } from '../../consts/steps';

export const CltLastStepBadge = ({
  step,
  status
}: {
  step: LeadCltFlowName;
  status: LeadLastFlowExecutionStatus;
}) => {
  const badgeConfig = getCltBadgeConfig(step, status);

  if (!badgeConfig) {
    return null;
  }

  return (
    <div className="flex flex-col flex-wrap gap-1 justify-end">
      <Badge
        className={`gap-1 border-none shadow-none text-[10px] px-1.5 py-0 h-4 ${badgeConfig.color}`}
      >
        {badgeConfig.icon}
        {badgeConfig.label}
      </Badge>
    </div>
  );
};
