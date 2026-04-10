export const LeadCltFinalizationReasons = {
  'Sem interesse': 'Sem interesse',
  'Vai deixar pra depois': 'Vai deixar pra depois',
  'Cliente não responde mais': 'Cliente não responde mais'
} as const;

export type LeadCltFinalizationReason = keyof typeof LeadCltFinalizationReasons;
