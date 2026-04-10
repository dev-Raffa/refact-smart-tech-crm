import { Badge } from '@/shared/components/ui/badge';
import type { LeadLastFlowExecutionStatus } from '@/features/leads/types/lead.model';
import { getPublicServantsBadgeConfig } from '../../utils/get-public-servants-badge-config';
import type { LeadPublicServantFlowName } from '../../consts/steps';

export const PublciServantLastStepBadge = ({
  step,
  status
}: {
  step: LeadPublicServantFlowName;
  status: LeadLastFlowExecutionStatus;
}) => {
  const badgeConfig = getPublicServantsBadgeConfig(step, status);

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
