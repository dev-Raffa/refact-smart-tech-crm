import { useLeadsBoardContext } from '../../hooks/use-leads-board-context';
import type { GetLeadsParams } from '../../types/lead.model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { Filter } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export function ColumnFilterMenu({
  columnId,
  options
}: {
  columnId: string;
  options: { label: string; value: Partial<GetLeadsParams> }[];
}) {
  const { state, dispatch } = useLeadsBoardContext();
  const currentFilters = state.columnFilters[columnId] || {};

  const activeFilter = options.find((opt) => {
    const entries = Object.entries(opt.value);
    return (
      entries.length > 0 &&
      entries.every(
        ([key, val]) => currentFilters[key as keyof GetLeadsParams] === val
      )
    );
  });

  const handleSelect = (filter: Partial<GetLeadsParams>) => {
    dispatch({
      type: 'SET_COLUMN_FILTER',
      payload: { columnId, filter }
    });
  };

  const hasOptions = options.length > 0;

  return (
    <div className="flex flex-col w-full gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!hasOptions}>
          <Button
            variant="outline"
            disabled={!hasOptions}
            className={cn(
              'w-full justify-center gap-2 font-normal text-muted-foreground bg-white hover:bg-slate-50 border-slate-200 h-10 rounded-md',
              activeFilter &&
                'text-emerald-700 border-emerald-200 bg-emerald-50/50'
            )}
          >
            <Filter
              className={cn(
                'h-4 w-4',
                activeFilter && 'fill-emerald-700',
                !hasOptions && 'opacity-50'
              )}
            />
            {activeFilter ? activeFilter.label : 'Aplicar filtros'}
          </Button>
        </DropdownMenuTrigger>
        {hasOptions && (
          <DropdownMenuContent align="center" className="w-64">
            {options.map((opt) => (
              <DropdownMenuItem
                key={opt.label}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'flex justify-between items-center py-2',
                  activeFilter?.label === opt.label &&
                    'bg-emerald-50 text-emerald-700 focus:bg-emerald-100 focus:text-emerald-800'
                )}
              >
                {opt.label}
                {activeFilter?.label === opt.label && (
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </DropdownMenuItem>
            ))}
            {activeFilter && (
              <>
                <div className="h-px bg-muted my-1" />
                <DropdownMenuItem
                  onClick={() => handleSelect({})}
                  className="text-red-600 focus:text-red-700 py-2"
                >
                  Limpar filtro
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
