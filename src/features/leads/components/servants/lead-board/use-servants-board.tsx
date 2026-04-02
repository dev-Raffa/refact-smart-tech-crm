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

  const StageBadgeColor: Record<LeadStage, string> = {
    NewLead: 'bg-gray-400',
    Negotiation: 'bg-blue-500',
    Payed: 'bg-green-500',
    EmptyBalance: 'bg-purple-500',
    None: 'bg-gray-400',
    Digitation: 'bg-blue-500',
    Signature: 'bg-green-500'
  };

  return {
    leads: leadsData?.pages.flatMap((page) => page.results) || [],
    count: leadsData?.pages[0].totalResults,
    isLoading,
    handleDrop,
    StageBadgeColor
  };
}
