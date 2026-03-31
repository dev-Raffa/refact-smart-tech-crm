import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { LeadService } from '../services';
import type { GetLeadsParams } from '../types/lead.model';

export function useLeadsQuery(params: GetLeadsParams, enabled = true) {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => LeadService.getLeads(params),
    placeholderData: keepPreviousData,
    enabled
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
