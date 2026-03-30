import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';
import {
  DataTable,
  DataTableContent,
  PaginationControllers
} from '@/shared/components/global/datatable';

import { importsColumns } from './columns';
import { ImportsSkeleton } from '../imports-form/imports-form-skeleton';
import { useMemo } from 'react';
import { useImportsQuery } from '../../hooks/use-queries';

export function ImportsTable() {
  const { data, isPending } = useImportsQuery();

  const tableOptions = useMemo(
    () => ({
      data: data?.items ?? [],
      columns: importsColumns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel()
    }),
    [data]
  );

  if (isPending) return <ImportsSkeleton />;

  return (
    <div className="space-y-4">
      <DataTable
        tableOptions={tableOptions}
        emptyMessage="Nenhum arquivo encontrado."
      >
        <div className="rounded-md border">
          <DataTableContent />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Importados um total de <strong>{data?.items.length}</strong>{' '}
            arquivo(s).
          </div>
          <div className="flex w-full justify-end">
            <PaginationControllers />
          </div>
        </div>
      </DataTable>
    </div>
  );
}
