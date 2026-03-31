import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LeadService } from '../services';

export function useMoveLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.moveLead,
    meta: { successMessage: 'Lead movido com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useCreateInssLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.createInssLead,
    meta: { successMessage: 'Lead criado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useCreateCltLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.createCltLead,
    meta: { successMessage: 'Lead criado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useUploadLeadDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.uploadLeadDocument,
    meta: { successMessage: 'Documento enviado com sucesso!' },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({
        queryKey: ['leads', leadId, 'flow-steps']
      });
    }
  });
}

export function useSetReceivingAssistanceFlagMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.setReceivingAssistanceFlag,
    meta: { successMessage: 'Status de assistência atualizado.' },
    onSuccess: (_, leadId) => {
      queryClient.invalidateQueries({ queryKey: ['leads', leadId] });
    }
  });
}

export function useSetApprovedBankMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.setApprovedBank,
    meta: { successMessage: 'Banco aprovado com sucesso!' },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ['leads', leadId] });
    }
  });
}

export function useChangeBankApprovedMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.changeBankApproved,
    meta: { successMessage: 'Banco alterado com sucesso!' },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ['leads', leadId] });
    }
  });
}

export function useDeleteSimulationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.deleteSimulation,
    meta: { successMessage: 'Lead removido.' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useChangeOperatorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LeadService.changeOperator,
    meta: { successMessage: 'Operador alterado com sucesso!' },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ['leads', leadId] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useOpenHuggyChatMutation() {
  return useMutation({
    mutationFn: async (leadId: string) => {
      const customerDetails = await LeadService.getLeadDetails(leadId);
      if (!customerDetails || !customerDetails.chat?.chatId) {
        throw new Error('Chat não encontrado para este cliente');
      }
      return customerDetails.chat.chatId;
    },
    onSuccess: (chatId) => {
      window.open(
        `https://www.huggy.app/panel/attendance/inbox/?chat=${chatId}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  });
}
