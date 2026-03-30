import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '../services';
import type { UploadFileParams } from '../types/import.model';

export function useUploadFileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UploadFileParams) => uploadFile(params),
    meta: { successMessage: 'Arquivo importado com sucesso!' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
    }
  });
}
