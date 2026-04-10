export interface CreateCltLeadDto {
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

export interface ApprovedBankDto {
  bank: string;
  reason?: string;
}

export interface SetApprovedBankParams {
  leadId: string;
  data: ApprovedBankDto;
}
