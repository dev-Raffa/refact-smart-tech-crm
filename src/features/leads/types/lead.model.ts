import type { LeadFinalizationReason } from '../consts/finalization-reasons';
import type { LeadCltSteps, LeadPublicServantSteps } from '../consts/steps';

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
  facta?: FactaInformations;
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

export type LeadPublicServantFlowName = keyof typeof LeadPublicServantSteps;
export type LeadCltFlowName = keyof typeof LeadCltSteps;

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

export interface LeadPublicServantDetails {
  governamentLevel?: string;
  cityHall?: string;
  state?: string;
}

export interface LeadCltCompany {
  name: string;
  cnpj: string;
  admissionDate: string;
  salary: number;
  registration?: string;
  foundationDate?: string;
  workersCount?: number;
  cnaeCode?: string;
  cnaeDescription?: string;
}

export interface LeadCltDetails {
  companies: LeadCltCompany[];
  eligible: boolean;
  employmentStartDate?: string;
  employmentDuration?: number;
  marginAvailable?: number;
  totalEarnings?: number;
}

export interface FactaInformations {
  formalizationCode?: string;
  formalizationLink?: string;
}

export interface ApprovedBank {
  id: string;
  name: string;
  installmentTerm: number;
  releasedAmount: number;
  installmentAmount: number;
  interestRate: number;
  proposalNumber?: string;
}

export interface FailedBank {
  bankFailed: string;
  reasons: string[];
}

export interface OfferInformation {
  proposalNumber?: string;
  releasedAmount?: number;
  installmentAmount?: number;
  interestRate?: number;
  installmentTerm?: number;
  signatureAmount?: number;
  paid?: boolean;
  approvedBanks?: ApprovedBank[];
  failedBanks?: FailedBank[];
}

export interface ProductOfferInformation {
  fgts?: OfferInformation;
  clt?: OfferInformation;
  pix?: OfferInformation;
  cas?: OfferInformation;
  crefaz?: OfferInformation;
}

export type LeadProduct = 'Inss' | 'Clt';

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
  products: LeadProduct[];
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

export type LeadFiltersValuesOptions = {
  operators: LeadOperator[];
  sources: string[];
  audiences: string[];
};
