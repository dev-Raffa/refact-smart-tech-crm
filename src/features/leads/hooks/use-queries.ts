import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData
} from '@tanstack/react-query';
import { LeadService } from '../services';
import type { PaginatedResponse } from '@/shared/types/paginated-response';

export function useBaseLeadsPagination<T>(
  queryKey: unknown[],
  queryFn: (params: { pageParam?: number }) => Promise<PaginatedResponse<T>>,
  enabled = true
) {
  return useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    refetchInterval: 1000 * 30, // 30 seconds
    placeholderData: keepPreviousData,
    enabled,
    queryFn,
    getNextPageParam: (
      lastPage: PaginatedResponse<T> | undefined,
      allPages: PaginatedResponse<T>[]
    ) => {
      if (!lastPage) return undefined;

      const totalReturned = allPages.reduce(
        (acc, page) => acc + (page.results?.length || 0),
        0
      );
      const totalResults =
        lastPage.totalResults ??
        (lastPage as unknown as { TotalResults?: number }).TotalResults ??
        0;

      if (totalReturned < totalResults) {
        return allPages.length + 1;
      }

      return undefined;
    }
  });
}

export function useLeadDetailsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'details'],
    queryFn: () => LeadService.getLeadDetails(leadId),
    enabled: !!leadId
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
