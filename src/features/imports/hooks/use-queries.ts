import { useQuery } from '@tanstack/react-query';
import { getFiles } from '../services';

export function useImportsQuery() {
  return useQuery({
    queryKey: ['imports'],
    queryFn: getFiles,
  });
}
