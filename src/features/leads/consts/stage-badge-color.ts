import type { LeadStage } from '../types/lead.model';

export const StageBadgeColor: Record<LeadStage, string> = {
  NewLead: 'bg-gray-400',
  Negotiation: 'bg-blue-500',
  Payed: 'bg-green-500',
  EmptyBalance: 'bg-purple-500',
  None: 'bg-gray-400',
  Digitation: 'bg-blue-500',
  Signature: 'bg-green-500'
};
