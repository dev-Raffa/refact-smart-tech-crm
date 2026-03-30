import { useQuery } from '@tanstack/react-query';
import { ReportService } from '../services';
import { handleReportError } from '../services/error-handler';
import type { ReportType } from '../types';

export const REPORTS_QUERY_KEY = 'reports';

export const useReport = (type: ReportType, theme?: string) => {
  return useQuery({
    queryKey: [REPORTS_QUERY_KEY, type, theme],
    queryFn: () =>
      ReportService.getReport({ type, theme }).catch(handleReportError),
    staleTime: 0,
    enabled: !!type
  });
};
