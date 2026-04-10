export const LeadPublicServantFinalizationReasons = {
  'Sem resposta': 'Sem resposta',
  'Sem interesse': 'Sem interesse',
  'Cliente não responde mais': 'Cliente não responde mais'
} as const;

export const LeadPublicServantDisqualificationReasons = {
  'Não tem margem': 'Não tem margem',
  'Não compra': 'Não compra',
  'Não faz o orgão': 'Não faz o orgão'
} as const;

export type LeadPublicServantFinalizationReason =
  keyof typeof LeadPublicServantFinalizationReasons;
export type LeadPublicServantDisqualificationReason =
  keyof typeof LeadPublicServantDisqualificationReasons;
