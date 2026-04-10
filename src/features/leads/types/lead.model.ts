import type { LeadFinalizationReason } from '../consts/finalization-reasons';
import type { LeadCltFlowName } from '../segments/clt/consts/steps';
import type {
  LeadCltDetails,
  ProductOfferInformation
} from '../segments/clt/types/models';
import type { LeadPublicServantFlowName } from '../segments/public-servants/consts/steps';
import type { LeadPublicServantDetails } from '../segments/public-servants/types/models';

export interface LeadMarketing {
  source: string;
  audience: string;
}

export interface LeadChat {
  chatId: string;
  contactId: string;
  channelId: string;
}
export interface LeadDetails {
  id: string;
  customer: LeadCustomer;
  publicServantDetails: LeadPublicServantDetails;
  cltDetails?: LeadCltDetails;
  marketing: LeadMarketing;
  chat?: LeadChat;
  payslip?: string;
  history: FlowStep[];
  offers?: ProductOfferInformation;
}

export interface LeadCustomer {
  name: string;
  cpf: string;
  phoneNumbers: string[] | string;
  birthDate?: string;
  gender?: string;
  rg?: string;
  motherName?: string;
  zipCode?: string;
  city?: string;
  uf?: string;
  bank?: string;
  paymentDay?: number;
  creationDate?: string;
}

export interface LeadOperatorTeam {
  teamId: string;
  teamName: string;
}

export interface LeadOperator {
  id: string;
  name: string;
  username: string;
  teamDetails?: LeadOperatorTeam;
}

export interface LeadLastFlow {
  bank: string;
  flowName: LeadPublicServantFlowName | LeadCltFlowName;
  cadence: string;
  status: LeadLastFlowExecutionStatus;
  needsHumanHelp: boolean;
  user: string;
  receivingAssistance: boolean;
  executedAt: string;
  attempt: number;
  technicalResponseDetails?: {
    error: string;
    description: string;
    jsonReturned: string;
  };
}

export type LeadSegments = 'Inss' | 'Clt';

export type LeadStage =
  | 'None'
  | 'NewLead'
  | 'Negotiation'
  | 'Digitation'
  | 'Signature'
  | 'Payed'
  | 'EmptyBalance';

export interface Lead {
  id: string;
  date: string;
  availableBalance: number;
  stageName: LeadStage;
  approvedBank: string;
  finalizationReason: LeadFinalizationReason;
  products: LeadSegments[];
  customer: LeadCustomer;
  marketing: LeadMarketing;
  operator?: LeadOperator;
  lastFlow: LeadLastFlow;
  publicServantDetails: LeadPublicServantDetails;
  cltDetails?: LeadCltDetails;
}
export type LeadLastFlowExecutionStatus =
  | 'RunSuccessfully'
  | 'RunningNow'
  | 'RunFailed';

export interface GetLeadsParams {
  products?: LeadSegments[];
  stages?: LeadStage[];
  operatorIds?: string[];
  withConversationStatus?: 'All' | 'OnlyFinalized' | 'OnlyInProgress';

  lastFlowName?: string;
  lastFlowExecutionStatus?: LeadLastFlowExecutionStatus;
  withCadence?: boolean;
  includeFinalized?: boolean;
  includeNeedAssistence?: boolean;
  includeDataprevFailed?: boolean;
  includePendingSignature?: boolean;
  includeProposalPendingAcceptance?: boolean;
  includePendingPayment?: boolean;
  includePaid?: boolean;
  includeSigned?: boolean;
  includeMissingSignature?: boolean;
  includeInNegotiation?: boolean;
  manuallyDesqualification?: boolean;
  automaticallyDesqualification?: boolean;
  withReceivingAssistance?: boolean;
  withCpfInAuthorizationQueue?: boolean;

  cpf?: string;
  phoneNumber?: string;
  name?: string;
  proposalNumber?: string;

  dateIni?: string;
  dateEnd?: string;
  source?: string[];
  audience?: string[];

  page?: number;
  pageSize?: number;
}

export interface MoveLeadParams {
  leadId: string;
  targetStage: string;
}

export interface FlowStep {
  bank: string;
  flowName: string;
  cadence: string;
  status: LeadLastFlowExecutionStatus;
  needsHumanHelp: boolean;
  user?: {
    id: string;
    username: string;
  };
  receivingAssistance: boolean;
  executedAt: string;
  attempt: number;
  technicalResponseDetails?: {
    error: string;
    description: string;
    jsonReturned: string;
  };
}

export interface ChangeOperatorParams {
  leadId: string;
  operator: {
    id: string;
    name: string;
    username: string;
  };
}

export type LeadFiltersValuesOptions = {
  operators: LeadOperator[];
  sources: string[];
  audiences: string[];
};
