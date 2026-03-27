export interface LeadCustomerMarketing {
  source: string;
  audience: string;
}

export interface LeadCustomer {
  name: string;
  cpf: string | null;
  marketingDetails?: LeadCustomerMarketing;
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
  flowName: string;
  cadence: string;
  status: string;
  needsHumanHelp: boolean;
  user: string;
  receivingAssistance: boolean;
  executedAt: string;
  attempt: number;
}

export interface LeadPublicServantDetails {
  governmentLevel?: string;
  cityHall?: string;
  state?: string;
}

export type LeadProduct = 'Inss' | 'Clt';

export type LeadStage =
  | 'NewLead'
  | 'InNegotiation'
  | 'Proposal'
  | 'FollowUp'
  | 'Sale'
  | 'Disqualified';

export interface Lead {
  id: string;
  date: string;
  availableBalance: number;
  stageName: LeadStage;
  approvedBank: string;
  finalizationReason: string;
  products: LeadProduct[];
  customer: LeadCustomer;
  operator?: LeadOperator;
  lastFlow?: LeadLastFlow;
  publicServantDetails?: LeadPublicServantDetails;
}

export type LeadLastFlowExecutionStatus = 'RunSuccessfully' | 'RunningNow' | 'RunFailed';

export interface GetLeadsParams {
  products?: LeadProduct[];
  stages?: LeadStage[];
  operatorIds?: string[];
  withConversationStatus?: 'All' | 'OnlyFinalized' | 'OnlyInProgress';

  // Specific legacy filters
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

  // Search filters
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
  name: string;
  description: string;
  executedAt: string;
  status: LeadLastFlowExecutionStatus;
  user?: string;
}

export interface PartnerInformations {
  bankName: string;
  status: string;
  updatedAt: string;
}

export interface ApprovedBankRequest {
  bank: string;
  reason?: string;
}

export interface CreateInssLeadRequest {

  name: string;
  cpf: string;
  phoneNumber: string;
  servantInformation: {
    governmentLevel: string;
    cityHall: string;
    state: string;
  };
  product: 'Inss';
  stageName: 'NewLead';
  operator: {
    id: string;
    name: string;
    username: string;
  };
}

export interface CreateCltLeadRequest {
  name: string;
  cpf: string;
  phoneNumber: string;
  installmentTerm: number;
  installmentAmount: number;
  interestRate: number;
  bank: string;
  operator: {
    id: string;
    name: string;
    username: string;
  };
}

export interface UploadLeadDocumentParams {
  leadId: string;
  file: File;
}

export interface SetApprovedBankParams {
  leadId: string;
  data: ApprovedBankRequest;
}

export interface ChangeOperatorParams {
  leadId: string;
  operator: { 
    id: string; 
    name: string; 
    username: string; 
  };
}



