import type { ReactNode } from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { type TLeadExecutionStatus, LeadExecutionStatus } from './execution-status';

type ExecutionStatusConfig = {
  color: string;
  icon: ReactNode;
  text: string;
};

export const STATUS_MAP: Record<
  TLeadExecutionStatus,
  ExecutionStatusConfig
> = {
  [LeadExecutionStatus.RunSuccessfully]: {
    color: 'text-green-500',
    icon: <CheckCircle className="size-4" />,
    text: 'Sucesso'
  },
  [LeadExecutionStatus.RunningNow]: {
    color: 'text-blue-500',
    icon: <Clock className="size-4" />,
    text: 'Executando'
  },
  [LeadExecutionStatus.RunFailedMarkedForRetry]: {
    color: 'text-red-500',
    icon: <XCircle className="size-4" />,
    text: 'Erro - Retentativa'
  },
  [LeadExecutionStatus.AllAttemptsExceededRetryIn1Hour]: {
    color: 'text-orange-500',
    icon: <AlertCircle className="size-4" />,
    text: 'Falhou'
  },
  [LeadExecutionStatus.RunFailed]: {
    color: 'text-red-500',
    icon: <XCircle className="size-4" />,
    text: 'Rodou com falha'
  }
};