export const LeadPublicServantFinalizationReasons = {
  'Sem resposta': 'Sem resposta',
  'Sem interesse': 'Sem interesse',
  'Cliente não responde mais': 'Cliente não responde mais'
} as const;

export const LeadCltFinalizationReasons = {
  'Sem interesse': 'Sem interesse',
  'Vai deixar pra depois': 'Vai deixar pra depois',
  'Cliente não responde mais': 'Cliente não responde mais'
} as const;

export const LeadPublicServantDisqualificationReasons = {
  'Não tem margem': 'Não tem margem',
  'Não compra': 'Não compra',
  'Não faz o orgão': 'Não faz o orgão'
} as const;

export const LeadFinalizationReasons = {
  Nenhum: 'Nenhum',
  'Sem interesse': 'Sem interesse',
  'Sem resposta': 'Sem resposta',
  Abandonado: 'Abandonado',
  'Não compra': 'Não compra',
  'Não tem margem': 'Não tem margem',
  'Não realiza serviço': 'Não realiza serviço',
  'Vai deixar pra depois': 'Vai deixar pra depois'
} as const;

export type LeadPublicServantFinalizationReason =
  keyof typeof LeadPublicServantFinalizationReasons;
export type LeadCltFinalizationReason = keyof typeof LeadCltFinalizationReasons;
export type LeadPublicServantDisqualificationReason =
  keyof typeof LeadPublicServantDisqualificationReasons;
export type LeadFinalizationReason = keyof typeof LeadFinalizationReasons;
