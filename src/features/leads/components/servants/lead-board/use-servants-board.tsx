import { useMoveLeadMutation } from '../../../hooks/use-mutations';
import { useLeads } from '../../../hooks/use-leads';
import type { LeadStage } from '../../../types/lead.model';

type UseServantsBoardParams = {
  stageId: LeadStage;
};

export function useServantsBoard({ stageId }: UseServantsBoardParams) {
  const { mutateAsync } = useMoveLeadMutation();
  const { data: leadsData, isLoading } = useLeads(stageId);

  const handleDrop = async (leadId: string) => {
    await mutateAsync({ leadId, targetStage: stageId });
  };

  return {
    leads: leadsData?.results || [],
    count: leadsData?.totalResults,
    isLoading,
    handleDrop,
  };
}
