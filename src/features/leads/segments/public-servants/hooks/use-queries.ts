import { useQuery } from '@tanstack/react-query';
import { PublicServantLeadService } from '../services';

export function useLeadPaySlipUrlQuery(name: string) {
  return useQuery({
    queryKey: ['leads', name, 'pay-slip-url'],
    queryFn: () => PublicServantLeadService.getPaySlipUrl(name),
    enabled: !!name
  });
}
