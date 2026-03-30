import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useReport } from '../hooks/use-reports';
import type { ReportType } from '../types';

export const ReportViewer = () => {
  const [reportType, setReportType] = useState<ReportType>('Customers');

  const { data: report, isLoading } = useReport(reportType);

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-4 lg:px-6">
      <Select
        value={reportType}
        onValueChange={(value) => setReportType(value as ReportType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Opções" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Customers">Clientes</SelectItem>
        </SelectContent>
      </Select>

      {isLoading && <Skeleton className="h-screen w-full" />}

      {!isLoading && report && (
        <iframe
          className="h-screen w-full rounded-2xl overflow-hidden border"
          src={report.url}
          title="Relatório"
        />
      )}

      {!isLoading && !report && (
        <p className="text-sm text-muted-foreground">
          Selecione um tipo de relatório para visualizar.
        </p>
      )}
    </div>
  );
};
