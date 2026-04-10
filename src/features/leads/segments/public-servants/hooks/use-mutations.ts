import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PublicServantLeadService } from '../services';

export function useCreatePublicServantLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PublicServantLeadService.createLead,
    meta: { successMessage: 'Lead criado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useUploadPaySlipMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PublicServantLeadService.uploadPaySlip,
    meta: { successMessage: 'Contra-cheque enviado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}
