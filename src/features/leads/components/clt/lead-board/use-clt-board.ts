import { useLeads } from '@/features/leads/hooks/use-leads';
import { useMoveLeadMutation } from '@/features/leads/hooks/use-mutations';
import type { LeadStage } from '@/features/leads/types/lead.model';

type UseCLTBoardParams = {
  stageId: LeadStage;
};

export function useCLTBoard({ stageId }: UseCLTBoardParams) {
  const { mutateAsync } = useMoveLeadMutation();
  const { data: leadsData, isLoading } = useLeads(stageId);

  const handleDrop = async (leadId: string) => {
    await mutateAsync({ leadId, targetStage: stageId });
  };

  return {
    leads: leadsData?.pages.flatMap((page) => page.results) || [],
    count: leadsData?.pages[0].totalResults,
    isLoading,
    handleDrop
  };
}
