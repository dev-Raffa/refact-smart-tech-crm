import type { Report, ReportUrlResponseDTO } from '../types';

export class ReportMapper {
  static toDomain(dto: ReportUrlResponseDTO): Report {
    return {
      url: dto.reportUrl,
    };
  }
}
