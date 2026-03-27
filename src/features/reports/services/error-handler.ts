import { toast } from 'sonner';

export function handleReportError(error: unknown): never {
  console.error('[reports] Error:', error);
  toast.error('Erro ao carregar relatório. Tente novamente.');
  throw error;
}
