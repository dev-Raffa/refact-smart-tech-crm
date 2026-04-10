import type { CreatePublicServantLeadDto } from '../types/dtos';
import type { CreatePublicServantLead } from '../types/models';

export class PublicServantsLeadMapper {
  public static toCreateDto(
    data: CreatePublicServantLead
  ): CreatePublicServantLeadDto {
    return {
      name: data.nome,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber,
      servantInformation: {
        governmentLevel: data.orgao,
        cityHall: data.prefeitura || '',
        state: data.estado || ''
      },
      product: 'PublicServant',
      stageName: 'NewLead',
      operator: data.operator,
      file: data.contraCheque?.[0] as File | undefined
    };
  }
}
