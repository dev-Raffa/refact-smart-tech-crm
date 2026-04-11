import type {
  LeadCltDetails,
  ProductOfferInformation
} from '../segments/clt/types/models';
import type { LeadPublicServantDetails } from '../segments/public-servants/types/models';

export interface LeadMarketing {
  source: string;
  audience: string;
}

export interface LeadCustomer {
  name: string;
  cpf: string;
}

export interface LeadLastFlow {
  flowName: string;
  status: LeadLastFlowExecutionStatus;
  receivingAssistance: boolean;
  cadence: string;
  needsHumanHelp: boolean;
}

export interface LeadOperator {
  id: string;
  name: string;
  username?: string;
}

export interface LeadChat {
  chatId: string;
  contactId: string;
  channelId: string;
}

export interface Lead {
  id: string;
  date: string;
  stageName: string;
  availableBalance: number;
  finalizationReason?: string | null;
  customer: LeadCustomer;
  lastFlow: LeadLastFlow;
  marketing?: LeadMarketing;
  operator?: LeadOperator;
}

export interface LeadDetails {
  id: string;
  customer: OldLeadCustomer;
  publicServantDetails: LeadPublicServantDetails;
  cltDetails?: LeadCltDetails;
  marketing: LeadMarketing;
  chat?: LeadChat;
  payslip?: string;
  history: FlowStep[];
  offers?: ProductOfferInformation;
}

export interface OldLeadCustomer {
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

export interface OldLeadOperator {
  id: string;
  name: string;
  username: string;
  teamDetails?: LeadOperatorTeam;
}
export type LeadSegments = 'Inss' | 'Clt' | 'PublicServant';

export type LeadStage =
  | 'None'
  | 'NewLead'
  | 'Negotiation'
  | 'Digitation'
  | 'Signature'
  | 'Payed'
  | 'EmptyBalance';

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
  operators: OldLeadOperator[];
  sources: string[];
  audiences: string[];
};
