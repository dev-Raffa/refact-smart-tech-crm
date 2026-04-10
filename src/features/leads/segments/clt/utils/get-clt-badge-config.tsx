import type { ReactNode } from 'react';

import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { LeadBadgeColors } from '@/features/leads/consts/badge-colors';
import type { LeadLastFlowExecutionStatus } from '@/features/leads/types/lead.model';
import type { LeadCltFlowName } from '../consts/steps';

type BadgeConfig = {
  label: string;
  color: string;
  icon: ReactNode;
};

export function getCltBadgeConfig(
  step: LeadCltFlowName,
  status: LeadLastFlowExecutionStatus
): BadgeConfig | undefined {
  switch (step) {
    case 'StartingCustomerAttendance':
      if (status === 'RunningNow') {
        return {
          label: 'Aguardando atendimento',
          color: LeadBadgeColors.BLUE,
          icon: <Clock className="size-4" />
        };
      }

      return {
        label: 'Em atendimento',
        color: LeadBadgeColors.SUCCESS,
        icon: <CheckCircle className="size-4" />
      };
    case 'ValidatingCpf':
      if (status === 'RunningNow') {
        return {
          label: 'Validando CPF',
          color: LeadBadgeColors.BLUE,
          icon: <Clock className="size-4" />
        };
      }

      if (status === 'RunFailed') {
        return {
          label: 'CPF inválido',
          color: LeadBadgeColors.DANGER,
          icon: <XCircle className="size-4" />
        };
      }

      return {
        label: 'CPF validado',
        color: LeadBadgeColors.SUCCESS,
        icon: <CheckCircle className="size-4" />
      };
    case 'ConversationStarted':
      return {
        label: 'Conversa iniciada',
        color: LeadBadgeColors.SUCCESS,
        icon: <CheckCircle className="size-4" />
      };
    case 'ConversationEnded':
      return {
        label: 'Conversa encerrada',
        color: LeadBadgeColors.WARNING,
        icon: <CheckCircle className="size-4" />
      };
    default:
      return undefined;
  }
}
