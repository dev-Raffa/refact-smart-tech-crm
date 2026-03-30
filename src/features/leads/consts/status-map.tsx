/*import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { LeadStepExecutionStatus } from '../types/lead.model';

type ExecutionStatusConfig = {
  color: string;
  icon: ReactNode;
  text: string;
};

export const STATUS_MAP: Record<
  LeadStepExecutionStatus,
  ExecutionStatusConfig
> = {
  [LeadStepExecutionStatus.RunSuccessfully]: {
    color: 'text-green-500',
    icon: <CheckCircle className="size-4" />,
    text: 'Sucesso'
  },
  [LeadStepExecutionStatus.RunningNow]: {
    color: 'text-blue-500',
    icon: <Clock className="size-4" />,
    text: 'Executando'
  },
  [LeadStepExecutionStatus.RunFailedMarkedForRetry]: {
    color: 'text-red-500',
    icon: <XCircle className="size-4" />,
    text: 'Erro - Retentativa'
  },
  [LeadStepExecutionStatus.AllAttemptsExceededRetryIn1Hour]: {
    color: 'text-orange-500',
    icon: <AlertCircle className="size-4" />,
    text: 'Falhou'
  },
  [LeadStepExecutionStatus.RunFailed]: {
    color: 'text-red-500',
    icon: <XCircle className="size-4" />,
    text: 'Rodou com falha'
  }
};
*/