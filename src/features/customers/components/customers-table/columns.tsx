import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { maskDocument } from '@/shared/utils/masks/mask-document';
import { maskPhone } from '@/shared/utils/masks/mask-phone';
import type { Customer } from '../../types/customer.model';

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: "",
    size:5,
    enableResizing: false,
    cell: () => (
      <div className="text-xs w-5">
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="w-full text-sm ">
        Nome
      </div>
    ),
    cell: ({ row }) => {
      const fullName: string = row.getValue('name');

      return (
        <div className="max-w-32 w-fit text-[13px] pr-12 lowercase 2xl:max-w-36 2xl:text-sm" title={fullName}>
          {fullName}
        </div>
      );
    },
    size: 250,
    enableResizing: false
  },
  {
    accessorKey: 'cpf',
    header: () => <div className="text-sm">CPF</div>,
    cell: ({ row }) => {
      const document: string = row.getValue('cpf');
      const replaceDocument = maskDocument(document);

      return (
        <div className="text-xs truncate">
          {replaceDocument}
        </div>
      );
    },
    size: 150,
    enableResizing: false
  },
  {
    accessorKey: 'phoneNumber1',
    size: 150,
    enableResizing: false,
    header: () => (
      <div className="text-sm">Telefone</div>
    ),
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue('phoneNumber1');
      const replacePhoneNumber = maskPhone(phoneNumber);

      return (
        <div className="text-xs truncate">
          {replacePhoneNumber}
        </div>
      );
    },
  },
  {
    accessorKey: 'creationDate',
    size: 150,
    enableResizing: false,
    header: () => (
      <>
        <div className="text-sm sm:hidden">Criação</div>
        <div className="hidden sm:flex text-sm">Criado em</div>
      </>
    ),
    cell: ({ row }) => {
      const creationDate: string = row.getValue('creationDate');

      if (!creationDate) return <div className="text-xs text-gray-400">N/A</div>;

      return (
        <div className="text-xs truncate">
          {format(new Date(creationDate), `dd/MM/yyyy - HH:mm`, { locale: ptBR })}
        </div>
      );
    },
  },
  {
    accessorKey: 'creationOrigin',
    size: 150,
    enableResizing: false,
    header: () => (
      <div className="text-sm">
        Prospecção
      </div>
    ),
    cell: ({ row }) => {
      const origin: string = row.getValue('creationOrigin');
      const customerOrigin: string = origin === 'Api' ? 'Marketing' : 'Base';

      return (
        <div className="text-xs truncate lowercase">
          {customerOrigin}
        </div>
      );
    },
  },
];
