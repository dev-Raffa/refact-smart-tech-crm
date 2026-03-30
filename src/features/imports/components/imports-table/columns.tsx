import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { ImportedFile } from '../../types/import.model';
import { formatToBrNumber } from '@/shared/utils/formaters/format-to-br-number';

export const importsColumns: ColumnDef<ImportedFile>[] = [
  {
    accessorKey: 'user',
    header: () => <div className="text-sm">Responsável</div>,
    cell: ({ row }) => {
      const user = row.original.user;
      return <div className="text-sm">{user?.username ?? '-'}</div>;
    }
  },
  {
    accessorKey: 'filePath',
    header: () => <div className="text-sm">Arquivo</div>,
    cell: ({ row }) => (
      <div className="max-w-64 text-sm truncate">
        {row.getValue('filePath')}
      </div>
    )
  },
  {
    accessorKey: 'totalRows',
    header: () => <div className="flex text-sm">Total</div>,
    cell: ({ row }) => (
      <div className="flex text-sm truncate">
        {formatToBrNumber(row.getValue('totalRows'))}
      </div>
    )
  },
  {
    accessorKey: 'totalRowsImported',
    header: () => <div className="text-sm">Importados</div>,
    cell: ({ row }) => (
      <div className="text-sm truncate">
        {formatToBrNumber(row.getValue('totalRowsImported'))}
      </div>
    )
  },
  {
    accessorKey: 'totalRowsNotImported',
    header: () => <div className="flex text-sm">Falhou</div>,
    cell: ({ row }) => (
      <div className="flex items-center text-sm">
        {formatToBrNumber(row.getValue('totalRowsNotImported'))}
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: () => (
      <div className="hidden sm:flex sm:justify-center">Status</div>
    ),
    cell: ({ row }) => {
      const statusMap: Record<string, string> = {
        Concluded: 'Finalizado',
        InProgress: 'Processando',
        Failed: 'Não importado'
      };
      const status = row.original.status;
      const displayStatus = statusMap[status] ?? status;

      return (
        <div className="max-w-36 mx-auto flex justify-center items-center">
          <Badge
            className={cn(
              'bg-transparent border border-zinc-200 text-xs tracking-wide hover:bg-transparent dark:border-border',
              status === 'Concluded' &&
                'text-emerald-600 text-[13px] font-medium dark:text-emerald-400',
              status === 'InProgress' &&
                'text-blue-600 text-[13px] font-medium dark:text-blue-400',
              status === 'Failed' &&
                'text-red-600 text-[13px] font-medium dark:text-red-400 truncate'
            )}
          >
            <span
              className={cn(
                'size-1 mr-2 rounded-full',
                status === 'Concluded' && 'bg-emerald-600 dark:bg-emerald-400',
                status === 'InProgress' && 'bg-blue-600 dark:bg-blue-400',
                status === 'Failed' && 'bg-red-600 dark:bg-red-400'
              )}
            />
            {displayStatus}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'fileType',
    header: () => <div className="flex text-sm">Origem</div>,
    cell: ({ row }) => {
      const sourceType =
        row.original.fileType === 'Customers' ? 'Clientes' : 'Convênio';
      return <div className="flex text-sm truncate">{sourceType}</div>;
    }
  },
  {
    accessorKey: 'importedAt',
    header: () => <div className="flex text-sm">Criação</div>,
    cell: ({ row }) => {
      const date = format(new Date(row.getValue('importedAt')), 'dd/MM/yyyy');
      return <div className="flex text-sm truncate">{date}</div>;
    }
  }
];
