export interface LeadCustomerMarketingDTO {
  source: string;
  audience: string;
}

export interface LeadTagsDTO {
  id: string;
  tagId: number;
  label: string;
  category: 'Audience' | 'Source';
  product: 'Inss' | 'Clt' | 'PublicServant';
}

export interface LeadChatDTO {
  contactId: string;
  chatId: string;
  channelId: string;
}

export interface LeadCustomerDTO {
  id: string;
  name: string;
  cpf: string | null;
  phoneNumber1: string | null;
  phoneNumber2: string | null;
  email: string | null;
  dateBirth: string;
  motherName: string | null;
  gender: string | null;
  zipCode: string | null;
  rg: string | null;
  city: string | null;
  uf: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  creationDate: string;
  segment: string;
  marketingDetails: LeadCustomerMarketingDTO | null;
  huggyDetails: LeadChatDTO | null;
  bankDetails: any | null;
  cltDetails: any | null;
  publicServantDetails: any | null;
  pix: any | null;
  bank: string | null;
  paymentDay: number | null;
  documentFileName: string | null;
}

export interface LeadCustomerDetailsDTO {
  customer: LeadCustomerDTO;
}

export interface LeadOperatorTeamDTO {
  teamId: string;
  teamName: string;
}

export interface LeadOperatorDTO {
  id: string;
  name: string;
  username: string;
  teamDetails: LeadOperatorTeamDTO | null;
}

export interface LeadFlowTechnicalDetailsDTO {
  error: string;
  description: string;
  jsonReturned: string;
}

export interface LeadLastFlowDTO {
  bank: string;
  flowName: string;
  cadence: string;
  status: string;
  needsHumanHelp: boolean;
  user: string | null;
  receivingAssistance: boolean;
  executedAt: string;
  attempt: number;
  technicalResponseDetails: LeadFlowTechnicalDetailsDTO;
}

export interface LeadPublicServantDetailsDTO {
  governmentLevel: string | null;
  cityHall: string | 'NOT INFORMED';
  state: string | 'NOT INFORMED';
}

export interface FlowStepDTO {
  bank: string;
  flowName: string;
  cadence: string;
  status: string;
  needsHumanHelp: boolean;
  user: { id: string; username: string } | null;
  receivingAssistance: boolean;
  executedAt: string;
  attempt: number;
  technicalResponseDetails: LeadFlowTechnicalDetailsDTO;
}

export interface PartnerInformationsDTO {
  bankName: string;
  status: string;
  updatedAt: string;
}

export interface FactaUsefulInformationsDTO {
  factaSimulationId: string | null;
  factaSimulatorId: string | null;
  factaFormalizationCode: string | null;
  factaCustomerCode: string | null;
  factaFormalizationLink: string | null;
}

export interface ApprovedBanksDTO {
  id: string;
  name: string;
  installmentTerm: number;
  releasedAmount: number;
  installmentAmount: number;
  interestRate: number;
  proposalNumber?: string;
}

export interface FailureReasonItemDTO {
  bankFailed: string;
  reasons: string[];
}

export interface GeneralOfferInformationDTO {
  proposalNumber: string;
  releasedAmount: number;
  installmentAmount: number;
  interestRate: number;
  installmentTerm: number;
  paid: boolean;
}

export interface CasOfferInformationDTO {
  proposalNumber: string;
  signatureAmount: number;
  paid: boolean;
}

export interface CltOfferInformationDTO {
  failedBanks?: FailureReasonItemDTO[] | null;
  approvedBanks: ApprovedBanksDTO[];
}

export interface BankPartnerInformationsDTO {
  bank: string;
  factaUsefulInformations: FactaUsefulInformationsDTO;
  cltOfferInformation: CltOfferInformationDTO | null;
  casOfferInformation?: CasOfferInformationDTO;
  fgtsOfferInformation?: GeneralOfferInformationDTO;
  pixOfferInformation?: GeneralOfferInformationDTO;
  crefazOfferInformation?: GeneralOfferInformationDTO;
}

export interface LeadDTO {
  id: string;
  date: string;
  availableBalance: number;
  stageName: string;
  approvedBank: string;
  finalizationReason: string;
  products: string[];
  customer: LeadCustomerDTO;
  operator: LeadOperatorDTO | null;
  lastFlow: LeadLastFlowDTO | null;
  publicServantDetails: LeadPublicServantDetailsDTO | null;
}

export interface getFlowStepsResponse {
  flowStepsInfo: FlowStepDTO[];
}
