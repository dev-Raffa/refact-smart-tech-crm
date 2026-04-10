import { LeadCommonSteps } from '@/features/leads/consts/common-steps';

export const LeadPublicServantSpecificSteps = {
  SendingPublicServantInformation: 'Enviando informações de servidor público',
  SendingPayslip: 'Enviando contra-cheque',
  AskingAgency: 'Perguntando agência',
  AskingState: 'Perguntando estado',
  AskingCityHall: 'Perguntando prefeitura'
} as const;

export const LeadPublicServantSteps = {
  ...LeadCommonSteps,
  ...LeadPublicServantSpecificSteps
};

export type LeadPublicServantFlowName = keyof typeof LeadPublicServantSteps;
