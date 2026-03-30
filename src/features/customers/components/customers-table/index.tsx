import {
  DataTable,
  DataTableContent,
  PaginationControllers
} from '@/shared/components/global/datatable';

import { useCustomersTable } from './use-customers-table';
import { CustomersFilters } from '../customers-filters';
import { CustomersSkeleton } from '../customers-skeleton';
import { ExportCustomersDialog } from '../export-customers-dialog';

export function CustomersTable() {
  const {
    tableOptions,
    isLoading,
    totalResults,
    filters,
    setFilters,
    actions
  } = useCustomersTable();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <CustomersFilters
          filters={filters}
          setFilters={setFilters}
          actions={actions}
        />
        <ExportCustomersDialog filters={filters} totalResults={totalResults} />
      </div>

      {isLoading ? (
        <CustomersSkeleton />
      ) : (
        <DataTable
          tableOptions={tableOptions}
          emptyMessage="Nenhum cliente encontrado."
        >
          <div className="rounded-md border">
            <DataTableContent />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              Total de <strong>{totalResults}</strong> cliente(s) encontrado(s).
            </div>
            <div className="flex w-full md:w-auto justify-end">
              <PaginationControllers />
            </div>
          </div>
        </DataTable>
      )}
    </div>
  );
}
