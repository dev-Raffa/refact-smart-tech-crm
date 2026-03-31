export const LeadFinalizationReasons = {
  None: 'Nenhum',
  NoInterest: 'Sem interesse',
  NoResponse: 'Sem resposta',
  Abandoned: 'Abandonado',
  NoPurchase: 'Sem compra',
  NoMargin: 'Sem margem',
  DoesNotPerformService: 'Não realiza serviço'
} as const;


export type LeadFinalizationReason = keyof typeof LeadFinalizationReasons;