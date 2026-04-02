import { ReportViewer } from '../components/report-viewer';

export const ReportsPage = () => {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
        <div className="flex flex-col gap-2 pb-6">
          <h2 className="text-2xl font-semibold">Gerenciar relatórios</h2>
          <p className="text-muted-foreground">
            Gerencie de forma centralizada os relatórios.
          </p>
        </div>
        <ReportViewer />
      </div>
    </>
  );
};
