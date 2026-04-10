import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CltLeadService } from '../services';

export function useCreateCltLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CltLeadService.createLead,
    meta: { successMessage: 'Lead criado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useSetApprovedBankMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CltLeadService.setApprovedBank,
    meta: { successMessage: 'Banco aprovado com sucesso!' },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ['leads', leadId] });
    }
  });
}

export function useChangeBankApprovedMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CltLeadService.changeBankApproved,
    meta: { successMessage: 'Banco alterado com sucesso!' },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ['leads', leadId] });
    }
  });
}
