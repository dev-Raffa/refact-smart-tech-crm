import { PageHeader } from '@/shared/components/global/page-header';
import { CustomersTable } from '../components/customers-table';

export function CustomersPage() {
  return (
    <>
      <PageHeader title="Clientes" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
        <div className="flex flex-col gap-2 pb-2">
          <h2 className="text-2xl font-semibold">Minha base de clientes</h2>
          <p className="text-muted-foreground">
            Gerencie, filtre e exporte os clientes cadastrados ou prospectados no sistema.
          </p>
        </div>

        <CustomersTable />
      </div>
    </>
  );
}
