export const LeadPublicServantFinalizationReasons = {
  NoResponse: 'Sem resposta',
  NoInterest: 'Sem interesse'
} as const;

export const LeadPublicServantDisqualificationReasons = {
  NoMargin: 'Não tem margem',
  NoPurchase: 'Não compra',
  DoesNotPerformService: 'Não faz o orgão'
} as const;

export const LeadFinalizationReasons = {
  None: 'Nenhum',
  NoInterest: 'Sem interesse',
  NoResponse: 'Sem resposta',
  Abandoned: 'Abandonado',
  NoPurchase: 'Sem compra',
  NoMargin: 'Sem margem',
  DoesNotPerformService: 'Não realiza serviço'
} as const;

export type LeadPublicServantFinalizationReason =
  keyof typeof LeadPublicServantFinalizationReasons;
export type LeadPublicServantDisqualificationReason =
  keyof typeof LeadPublicServantDisqualificationReasons;
export type LeadFinalizationReason = keyof typeof LeadFinalizationReasons;
