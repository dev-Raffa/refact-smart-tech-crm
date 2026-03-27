import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { LeadService } from '../services';
import type { GetLeadsParams } from '../types/lead.model';

export function useLeadsQuery(params: GetLeadsParams) {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => LeadService.getLeads(params),
    placeholderData: keepPreviousData,
  });
}

export function useLeadFlowStepsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'flow-steps'],
    queryFn: () => LeadService.getFlowSteps(leadId),
    enabled: !!leadId,
  });
}

export function useLeadCustomerDetailsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'customer'],
    queryFn: () => LeadService.getCustomerDetails(leadId),
    enabled: !!leadId,
  });
}

export function useLeadPublicServantDetailsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'public-servant-details'],
    queryFn: () => LeadService.getPublicServantDetails(leadId),
    enabled: !!leadId,
  });
}

export function useLeadPartnerInformationsQuery(leadId: string) {
  return useQuery({
    queryKey: ['leads', leadId, 'partner-informations'],
    queryFn: () => LeadService.getPartnerInformations(leadId),
    enabled: !!leadId,
  });
}
