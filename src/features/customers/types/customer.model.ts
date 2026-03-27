export type CustomerContractDetails = {
  functionalStatus: string;
  currentRate: number;
  currentInstallment: number;
  remainingTerm: number;
  institution: string;
  affiliation: string;
  earnings: string;
  cardMargin: number;
  loanMargin: number;
  amountContractsElegible: number;
};

export type CustomerMarketingDetails = {
  source: string;
  audience: string;
};

export type CustomerPublicServantInfo = {
  publicServantType: string;
  federalServantLink: string;
  statePublicServantLink: string;
  municipalPublicServantLink: string;
  armedForcesPublicServant: string;
};

export type CustomerBankDetails = {
  factaCustomerCode: string;
  name: string;
  code: string;
  agency: string;
  digit: string;
  account: string;
};

export type CustomerHuggyDetails = {
  contactId: string;
  chatId: string;
  channelId: string;
};

export type Customer = {
  id: string;
  creationDate: string;
  creationOrigin: string;
  contractDetails: CustomerContractDetails | null;
  marketingDetails: CustomerMarketingDetails | null;
  segment: string;
  publicServantInfo: CustomerPublicServantInfo | null;
  bankDetails: CustomerBankDetails | null;
  cltDetails: any | null;
  huggyDetails: CustomerHuggyDetails | null;
  pix: any | null;
  phoneNumber1: string;
  phoneNumber2: string;
  cpf: string;
  name: string;
  email: string;
  city: string;
  uf: string;
  dateBirth: string;
  motherName: string;
  gender: string;
  zipCode: string;
  street: string;
  number: string;
  district: string;
  rg: string;
  documentFileName: string | null;
};

export type PaginatedCustomers = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  results: Customer[];
};

export type GetCustomersParams = {
  cpf?: string;
  name?: string;
  phone?: string;
  origin?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
};

export type ExportCustomersParams = {
  origin: string;
  startDate: string;
  endDate: string;
};
