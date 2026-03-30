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

export function useLeadCustomerDetailsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'customer'],
    queryFn: () => LeadService.getCustomerDetails(leadId),
    enabled: !!leadId
  });
}

export function useOperatorsByRoleQuery(kind: string) {
  return useQuery({
    queryKey: ['operators', 'by-role', kind],
    queryFn: () => LeadService.getOperatorsByRole(kind),
    staleTime: 1000 * 60 * 10 // 10 minutes
  });
}

export function useLeadPaySlipUrlQuery(name: string) {
  return useQuery({
    queryKey: ['leads', name, 'pay-slip-url'],
    queryFn: () => LeadService.getPaySlipUrl(name),
    enabled: !!name
  });
}
