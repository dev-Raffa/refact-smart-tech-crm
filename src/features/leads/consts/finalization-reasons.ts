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

export type LeadFinalizationReason = keyof typeof LeadFinalizationReasons;
