import { useLeadsBoardContext } from './use-leads-board-context';
import type { LeadStage, GetLeadsParams } from '../types/lead.model';
import type { PaginatedResponse } from '@/shared/types/paginated-response';
import type { InfiniteData } from '@tanstack/react-query';

export function useLeads<T>(
  stageId: LeadStage,
  queryHook: (params: GetLeadsParams, enabled: boolean) => any
) {
  const { state } = useLeadsBoardContext();
  const columnFilter = state.columnFilters[stageId] || {};
  const hasOperatorsSelected = state.operatorIds.length > 0;

  const query = queryHook(
    {
      ...state,
      ...columnFilter,
      stages: [stageId],
      page: 1,
      pageSize: 30,
      dateIni: state.dateIni ?? undefined,
      dateEnd: state.dateEnd ?? undefined,
      name: state.name ?? undefined,
      cpf: state.cpf ?? undefined,
      phoneNumber: state.phoneNumber ?? undefined,
      proposalNumber: state.proposalNumber ?? undefined
    },
    hasOperatorsSelected
  );

  const EMPTY_PAGE: InfiniteData<PaginatedResponse<T>> = {
    pages: [
      {
        pageNumber: 1,
        pageSize: 30,
        totalResults: 0,
        totalPages: 0,
        results: []
      }
    ],
    pageParams: [1]
  };

  return {
    ...query,
    data: hasOperatorsSelected ? (query.data ?? EMPTY_PAGE) : EMPTY_PAGE,
    isLoading: query.isLoading || state.isFilterOptionsLoading
  };
}
