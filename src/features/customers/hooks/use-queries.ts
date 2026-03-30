import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../services';
import type { GetCustomersParams } from '../types/customer.model';

export function useCustomersQuery(params: GetCustomersParams) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => getCustomers(params)
  });
}
