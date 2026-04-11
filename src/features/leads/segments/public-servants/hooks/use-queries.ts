import { useQuery } from '@tanstack/react-query';
import { PublicServantLeadService } from '../services';
import { useBaseLeadsPagination } from '@/features/leads/hooks/use-queries';
import type { GetLeadsParams } from '@/features/leads/types/lead.model';

export function usePublicServantLeadsQuery(
  params: GetLeadsParams,
  enabled = true
) {
  return useBaseLeadsPagination(
    ['leads', 'public-servants', params],
    ({ pageParam = 1 }) =>
      PublicServantLeadService.getLeads({
        ...params,
        page: pageParam as number
      }),
    enabled
  );
}

export function useLeadPaySlipUrlQuery(name: string) {
  return useQuery({
    queryKey: ['leads', name, 'pay-slip-url'],
    queryFn: () => PublicServantLeadService.getPaySlipUrl(name),
    enabled: !!name
  });
}
