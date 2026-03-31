import type { LeadFinalizationReason } from '../consts/finalization-reasons';
import type { LeadStage } from './lead.model';

export interface RelatedFlow {
  flowId: string;
  title: string;
  description: string;
}

export interface AvailableFlow {
  id: string;
  flowId: string;
  title: string;
  description: string;
  product: string;
  relatedFlows: RelatedFlow[] | null;
  allowedStages: string[];
}

export interface FlowExecutionResult {
  chatId: string;
  reason: string;
}

export interface FlowFormState {
  reason?: LeadFinalizationReason;
  stage?: LeadStage;
}

export const FLOW_IDS = {
  DISQUALIFICATION: '475377',
  FINALIZATION: '476637',
  STAGE_CHANGE: '476973'
} as const;

export type FlowId = (typeof FLOW_IDS)[keyof typeof FLOW_IDS];

export const FLOW_STAGE_MAPPING: Record<string, LeadStage> = {
  NewLead: 'NewLead',
  Negotiation: 'Negotiation',
  Signature: 'Signature',
  Payed: 'Payed',
  Cadence: 'EmptyBalance',
  Digitation: 'Digitation'
};
