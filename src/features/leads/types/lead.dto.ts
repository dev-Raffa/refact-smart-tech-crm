export interface LeadCustomerMarketingDTO {
  source: string;
  audience: string;
}

export interface LeadCustomerDTO {
  name: string;
  cpf: string | null;
  marketingDetails: LeadCustomerMarketingDTO | null;
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
  cityHall: string | null;
  state: string | null;
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
