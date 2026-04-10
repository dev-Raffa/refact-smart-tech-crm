export interface CreatePublicServantLeadDto {
  name: string;
  cpf: string;
  phoneNumber: string;
  servantInformation: {
    governmentLevel: string;
    cityHall: string;
    state: string;
  };
  product: 'PublicServant';
  stageName: 'NewLead';
  operator: {
    id: string;
    name: string;
    username: string;
  };
  file?: File;
}

export interface UploadPaySlipDto {
  leadId: string;
  file: File;
}
