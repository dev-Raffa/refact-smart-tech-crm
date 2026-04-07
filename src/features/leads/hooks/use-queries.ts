import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData
} from '@tanstack/react-query';
import { LeadService } from '../services';
import type { GetLeadsParams } from '../types/lead.model';

export function useLeadsQuery(params: GetLeadsParams, enabled = true) {
  return useInfiniteQuery({
    queryKey: ['leads', params],
    initialPageParam: 1,
    refetchInterval: 1000 * 30, // 30 seconds
    placeholderData: keepPreviousData,
    enabled,
    queryFn: ({ pageParam = 1 }) =>
      LeadService.getLeads({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;

      const totalReturned = allPages.reduce(
        (acc, page) => acc + (page.results?.length || 0),
        0
      );
      const totalResults =
        lastPage.totalResults ?? (lastPage as any).TotalResults ?? 0;

      if (totalReturned < totalResults) {
        return allPages.length + 1;
      }

      return undefined;
    }
  });
}

export function useLeadFlowStepsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'flow-steps'],
    queryFn: () => LeadService.getFlowSteps(leadId),
    enabled: !!leadId
  });
}

export function useLeadDetailsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'details'],
    queryFn: () => LeadService.getLeadDetails(leadId),
    enabled: !!leadId
  });
}

export function useLeadPaySlipUrlQuery(name: string) {
  return useQuery({
    queryKey: ['leads', name, 'pay-slip-url'],
    queryFn: () => LeadService.getPaySlipUrl(name),
    enabled: !!name
  });
}

export function useLeadFiltersValuesOptionsQuery(product: string) {
  return useQuery({
    queryKey: ['leads', 'filters-values-options', product],
    queryFn: () => LeadService.getLeadFiltersValuesOptions(product),
    enabled: !!product,
    staleTime: 1000 * 60 * 60 // 1 hour
  });
}

export function useLeadFlowsQuery() {
  return useQuery({
    queryKey: ['leads', 'flows'],
    queryFn: () => LeadService.getAvailableFlows(),
    staleTime: 1000 * 60 * 60 // 1 hour
  });
}
