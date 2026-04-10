import { LeadCommonSteps } from '@/features/leads/consts/common-steps';

export const LeadCLtSpecificSteps = {
  ShowingAvailableSimulationLoanValues:
    'Exibindo valores de empréstimo de simulação disponíveis',
  EnrichCustomerWorkerDataViaDataPrevApi:
    'Enriquecendo dados do trabalhador via DataPrev API',
  GeneratingDataPrevLink: 'Gerando link DataPrev',
  ConfirmingDataPrevAuthorization: 'Confirmando autorização DataPrev',
  TryingGeneratingFormalizationLinkAutomatically:
    'Tentando gerar link de formalização automaticamente',
  TryingGeneratingFormalizationLinkManually:
    'Tentando gerar link de formalização manualmente',
  ConfirmingFormalizationLinkSignature:
    'Confirmando assinatura do link de formalização'
} as const;

export const LeadCltSteps = {
  ...LeadCommonSteps,
  ...LeadCLtSpecificSteps
};

export type LeadCltFlowName = keyof typeof LeadCltSteps;
