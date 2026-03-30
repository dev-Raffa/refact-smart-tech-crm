import type {
  CustomerDTO,
  GetCustomersResponseDTO,
  GetCustomersQueryParams,
  ExportCustomersRequestDTO
} from '../types/customer.dto';
import type {
  Customer,
  PaginatedCustomers,
  GetCustomersParams,
  ExportCustomersParams
} from '../types/customer.model';

export class CustomerMapper {
  static toModel(dto: CustomerDTO): Customer {
    return {
      id: dto.id,
      creationDate: dto.creationDate,
      creationOrigin: dto.creationOrigin,
      contractDetails: dto.contractDetails,
      marketingDetails: dto.marketingDetails,
      segment: dto.segment,
      publicServantInfo: dto.publicServantInfo,
      bankDetails: dto.bankDetails,
      cltDetails: dto.cltDetails,
      huggyDetails: dto.huggyDetails,
      pix: dto.pix,
      phoneNumber1: dto.phoneNumber1,
      phoneNumber2: dto.phoneNumber2,
      cpf: dto.cpf,
      name: dto.name,
      email: dto.email,
      city: dto.city,
      uf: dto.uf,
      dateBirth: dto.dateBirth,
      motherName: dto.motherName,
      gender: dto.gender,
      zipCode: dto.zipCode,
      street: dto.street,
      number: dto.number,
      district: dto.district,
      rg: dto.rg,
      documentFileName: dto.documentFileName
    };
  }

  static toPaginatedModel(dto: GetCustomersResponseDTO): PaginatedCustomers {
    return {
      pageNumber: dto.pageNumber,
      pageSize: dto.pageSize,
      totalPages: dto.totalPages,
      totalResults: dto.totalResults,
      results: dto.results.map(CustomerMapper.toModel)
    };
  }

  static toDTO(model: Customer): CustomerDTO {
    return {
      id: model.id,
      creationDate: model.creationDate,
      creationOrigin: model.creationOrigin,
      contractDetails: model.contractDetails,
      marketingDetails: model.marketingDetails,
      segment: model.segment,
      publicServantInfo: model.publicServantInfo,
      bankDetails: model.bankDetails,
      cltDetails: model.cltDetails,
      huggyDetails: model.huggyDetails,
      pix: model.pix,
      phoneNumber1: model.phoneNumber1,
      phoneNumber2: model.phoneNumber2,
      cpf: model.cpf,
      name: model.name,
      email: model.email,
      city: model.city,
      uf: model.uf,
      dateBirth: model.dateBirth,
      motherName: model.motherName,
      gender: model.gender,
      zipCode: model.zipCode,
      street: model.street,
      number: model.number,
      district: model.district,
      rg: model.rg,
      documentFileName: model.documentFileName
    };
  }

  private static formatApiDate(dateStr?: string): string | undefined {
    if (!dateStr) return undefined;

    const [year, month, day] = dateStr.split('-');

    if (!year || !month || !day) return dateStr;

    return `${day}-${month}-${year}`;
  }

  static toGetCustomersQueryParams(
    params: GetCustomersParams
  ): GetCustomersQueryParams {
    const query: GetCustomersQueryParams = {};

    if (params.cpf) query.Cpfs = params.cpf;
    if (params.name) query.Names = params.name;
    if (params.phone) query.Phones = params.phone;
    if (params.origin) query.CreationOrigin = params.origin;
    if (params.startDate)
      query.CreationDateStart = CustomerMapper.formatApiDate(params.startDate);
    if (params.endDate)
      query.CreationDateEnd = CustomerMapper.formatApiDate(params.endDate);
    if (params.page !== undefined) query['PageFilter.Page'] = params.page;
    if (params.pageSize !== undefined)
      query['PageFilter.PageSize'] = params.pageSize;

    return query;
  }

  static toExportCustomersDTO(
    params: ExportCustomersParams
  ): ExportCustomersRequestDTO {
    return {
      creationOrigin: params.origin as any,
      creationDateStart: CustomerMapper.formatApiDate(params.startDate) || '',
      creationDateEnd: CustomerMapper.formatApiDate(params.endDate) || ''
    };
  }
}
