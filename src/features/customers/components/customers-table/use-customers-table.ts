import { useSearchParams } from 'react-router';
import { useMemo } from 'react';
import {
  getCoreRowModel,
  type PaginationState,
  type OnChangeFn,
  type TableOptions,
} from '@tanstack/react-table';
import { useCustomersQuery } from '../../hooks/use-queries';
import { columns } from './columns';
import type { Customer } from '../../types/customer.model';

export function useCustomersTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterStates = {
    page: Number(searchParams.get('page') || 1),
    pageSize: Number(searchParams.get('pageSize') || 60),
    cpf: searchParams.get('cpf'),
    name: searchParams.get('name'),
    phone: searchParams.get('phone'),
    origin: searchParams.get('origin'),
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
  };

  const setFilterStates = (updates: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    }
    setSearchParams(newParams, { replace: true });
  };

  const { data, isLoading, isError } = useCustomersQuery({
    page: filterStates.page,
    pageSize: filterStates.pageSize,
    cpf: filterStates.cpf ?? undefined,
    name: filterStates.name ?? undefined,
    phone: filterStates.phone ?? undefined,
    origin: filterStates.origin ?? undefined,
    startDate: filterStates.startDate ?? undefined,
    endDate: filterStates.endDate ?? undefined,
  });

  const paginationState: PaginationState = useMemo(
    () => ({
      pageIndex: filterStates.page - 1, // TanStack table always uses 0-index internally
      pageSize: filterStates.pageSize,
    }),
    [filterStates.page, filterStates.pageSize]
  );

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    if (typeof updater === 'function') {
      const newState = updater(paginationState);
      setFilterStates({ page: newState.pageIndex + 1, pageSize: newState.pageSize });
    } else {
      setFilterStates({ page: updater.pageIndex + 1, pageSize: updater.pageSize });
    }
  };

  const tableOptions: Omit<TableOptions<Customer>, 'getCoreRowModel'> & { getCoreRowModel: any } = useMemo(
    () => ({
      data: data?.results ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount: data?.totalPages ?? -1,
      state: {
        pagination: paginationState,
      },
      onPaginationChange,
    }),
    [data, paginationState, onPaginationChange]
  );

  const actions = {
    clearFilters: () => {
      setFilterStates({
        page: 1,
        cpf: null,
        name: null,
        phone: null,
        origin: null,
        startDate: null,
        endDate: null,
      });
    },
  };

  return {
    tableOptions,
    isLoading,
    isError,
    totalResults: data?.totalResults ?? 0,
    filters: filterStates,
    setFilters: setFilterStates,
    actions,
  };
}
