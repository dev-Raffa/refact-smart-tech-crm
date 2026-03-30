import { httpClient } from '@/infra/api/gateway-api';
import type { Report, GetReportParams, ReportUrlResponseDTO } from '../types';
import { ReportMapper } from './mapper';

export class ReportService {
  static async getReport({ type, theme }: GetReportParams): Promise<Report> {
    const { data } = await httpClient.get<ReportUrlResponseDTO>(
      '/reports/url',
      {
        params: {
          ReportType: type,
          ReportTheme: theme
        }
      }
    );

    return ReportMapper.toDomain(data);
  }
}
