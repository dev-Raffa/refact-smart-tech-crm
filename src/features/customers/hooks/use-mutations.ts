import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCustomer,
  exportCustomers,
  updateCustomer,
  createCustomer
} from '../services';
import type { Customer } from '../types/customer.model';

export function useDeleteCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    meta: { successMessage: 'Cliente removido com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}

export function useUpdateCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, model }: { id: string; model: Partial<Customer> }) =>
      updateCustomer(id, model),
    meta: { successMessage: 'Cliente atualizado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}

export function useCreateCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    meta: { successMessage: 'Cliente importado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}

export function useExportCustomersMutation() {
  return useMutation({
    mutationFn: exportCustomers,
    meta: { successMessage: 'Solicitação de exportação enviada!' }
  });
}
