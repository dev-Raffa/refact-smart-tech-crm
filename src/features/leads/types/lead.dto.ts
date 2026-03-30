export interface LeadCustomerMarketingDTO {
  source: string;
  audience: string;
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
  user: string | null;
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
  flowSteps: FlowStepDTO[];
}
