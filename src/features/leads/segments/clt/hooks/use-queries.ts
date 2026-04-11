import { useBaseLeadsPagination } from '@/features/leads/hooks/use-queries';
import { CltLeadService } from '../services';
import type { GetLeadsParams } from '@/features/leads/types/lead.model';

export function useCltLeadsQuery(params: GetLeadsParams, enabled = true) {
  return useBaseLeadsPagination(
    ['leads', 'clt', params],
    ({ pageParam = 1 }) =>
      CltLeadService.getLeads({ ...params, page: pageParam as number }),
    enabled
  );
}
