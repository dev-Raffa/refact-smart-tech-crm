type HuggyDetailsDTO = {
  contactId: string;
  chatId: string;
  channelId: string;
};
type MarketingDetailsDTO = {
  source: string;
  audience: string;
};
type PublicServantInfoDTO = {
  publicServantType: string;
  federalServantLink: string;
  statePublicServantLink: string;
  municipalPublicServantLink: string;
  armedForcesPublicServant: string;
};
type BankDetailsDTO = {
  factaCustomerCode: string;
  name: string;
  code: string;
  agency: string;
  digit: string;
  account: string;
};

type ContractDetailsDTO = {
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

export type CustomerDTO = {
  id: string;
  creationDate: string;
  creationOrigin: string;
  contractDetails: ContractDetailsDTO | null;
  marketingDetails: MarketingDetailsDTO | null;
  segment: string;
  publicServantInfo: PublicServantInfoDTO | null;
  bankDetails: BankDetailsDTO | null;
  cltDetails: any | null;
  huggyDetails: HuggyDetailsDTO | null;
  pix: string | null;
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

export type GetCustomersResponseDTO = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  results: CustomerDTO[];
};

export type GetCustomersQueryParams = {
  Cpfs?: string;
  Names?: string;
  Phones?: string;
  CreationOrigin?: string;
  CreationDateStart?: string;
  CreationDateEnd?: string;
  'PageFilter.Page'?: number;
  'PageFilter.PageSize'?: number;
};

export type ExportCustomersRequestDTO = {
  creationOrigin: string;
  creationDateStart: string;
  creationDateEnd: string;
};
