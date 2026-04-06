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
  cpf?: string;
  formalizationUrl?: string;
}

export interface FlowVariables {
  SimulationId: string;
  userId: string;
  username: string;
  Reason?: LeadFinalizationReason;
  StageName?: LeadStage;
  cpf?: string;
  formalization_url?: string;
}

export const FLOW_IDS = {
  DISQUALIFICATION: '475377',
  CLT_DISQUALIFICATION: '462332',
  FINALIZATION: '476637',
  STAGE_CHANGE: '476973',
  CPF_CONSULTATION: '468211',
  FORMALIZATION_LINK: '466535',
  SIMULATION_OFFERS: '461828'
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
