import { Loader2 } from 'lucide-react';
import {
  BoardColumn,
  BoardColumnFilters,
  BoardColumnHeader,
  BoardEmpty,
  BoardItem
} from '@/shared/components/global/board';
import type { LeadStage, Lead } from '../../../types/lead.model';
import { useServantsBoard } from './use-servants-board';
import { PublicServantLeadCard } from '../lead-card';
import { Badge } from '@/shared/components/ui/badge';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { Filter } from 'lucide-react';
import type { GetLeadsParams } from '../../../types/lead.model';
import { cn } from '@/shared/utils/cn';
import { StageBadgeColor } from '@/features/leads/consts/stage-badge-color';

const COLUMN_FILTERS_OPTIONS: Record<
  string,
  { label: string; value: Partial<GetLeadsParams> }[]
> = {
  NewLead: [
    { label: 'Cadência', value: { withCadence: true } },
    { label: 'Precisa de assistência', value: { includeNeedAssistence: true } },
    { label: 'Finalizado', value: { includeFinalized: true } },
    { label: 'Em atendimento', value: { withReceivingAssistance: true } }
  ],
  Negotiation: [
    { label: 'Cadência', value: { withCadence: true } },
    {
      label: 'Aguardando atendimento',
      value: {
        lastFlowName: 'StartingCustomerAttendance',
        lastFlowExecutionStatus: 'RunningNow'
      }
    },
    { label: 'Finalizado', value: { includeFinalized: true } },
    { label: 'Em atendimento', value: { withReceivingAssistance: true } }
  ],
  Signature: [
    { label: 'Precisa de assistência', value: { includeNeedAssistence: true } },
    { label: 'Finalizado', value: { includeFinalized: true } },
    { label: 'Em atendimento', value: { withReceivingAssistance: true } }
  ]
};

type ServantBoardColumnProps = {
  id: LeadStage;
  title: string;
};

export function ServantBoardColumn({ id, title }: ServantBoardColumnProps) {
  const { leads, isLoading, handleDrop, count } = useServantsBoard({
    stageId: id
  });

  return (
    <BoardColumn
      id={id}
      onDrop={handleDrop}
      className="w-fit border-0 flex-shrink-0 transition-all bg-transparent overflow-y-auto overflow-x-hidden min-h-[calc(100vh-100px)]"
    >
      <BoardColumnHeader className="flex-row justify-between">
        <div className="flex gap-2 items-center">
          <Badge className={`${StageBadgeColor[id]} rounded-full size-3 p-0`} />
          <span className="text-lg font-semibold tracking-tight truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant={'secondary'}>{count}</Badge>
        </div>
      </BoardColumnHeader>

      <BoardColumnFilters className="py-0 px-4 mb-3 border-none flex w-full">
        {COLUMN_FILTERS_OPTIONS[id] && (
          <ColumnFilterMenu
            columnId={id}
            options={COLUMN_FILTERS_OPTIONS[id]}
          />
        )}
      </BoardColumnFilters>

      <div className="flex w-[320px] lg:w-[420px] flex-col  pb-4 px-4 min-h-[150px] overflow-y-auto no-scrollbar">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600 opacity-60" />
          </div>
        ) : leads.length === 0 ? (
          <BoardEmpty
            className="w-full border rounded-2xl"
            message="Nenhum lead"
          />
        ) : (
          leads.map((lead: Lead) => (
            <BoardItem key={lead.id} id={lead.id} draggable>
              <PublicServantLeadCard lead={lead} />
            </BoardItem>
          ))
        )}
      </div>
    </BoardColumn>
  );
}

function ColumnFilterMenu({
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

  return (
    <div className="flex flex-col w-full gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-center gap-2 font-normal text-muted-foreground bg-white hover:bg-slate-50 border-slate-200 h-10 rounded-xl',
              activeFilter &&
                'text-emerald-700 border-emerald-200 bg-emerald-50/50'
            )}
          >
            <Filter
              className={cn('h-4 w-4', activeFilter && 'fill-emerald-700')}
            />
            {activeFilter ? activeFilter.label : 'Aplicar filtros'}
          </Button>
        </DropdownMenuTrigger>
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
      </DropdownMenu>
    </div>
  );
}
