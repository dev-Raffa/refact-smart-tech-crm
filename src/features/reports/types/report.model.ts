export type ReportType = 'Customers';

export interface Report {
  url: string;
}

export interface GetReportParams {
  type: ReportType;
  theme?: string;
}
