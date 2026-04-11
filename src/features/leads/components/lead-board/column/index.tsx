import { type ReactNode, memo } from 'react';
import { Loader2 } from 'lucide-react';
import {
  BoardColumn,
  BoardColumnFilters,
  BoardColumnHeader,
  BoardEmpty,
  BoardItem
} from '@/shared/components/common/board';
import type { IBoardColumnConfig } from '@/shared/components/common/board/types';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import type { PaginatedResponse } from '@/shared/types/paginated-response';

import type {
  LeadStage,
  GetLeadsParams,
  Lead
} from '../../../types/lead.model';
import { useMoveLeadMutation } from '../../../hooks/use-mutations';
import { useLeads } from '../../../hooks/use-leads';
import { ColumnFilterMenu } from './filter-column-menu';

export interface LeadBoardColumnProps<T extends Lead>
  extends IBoardColumnConfig<LeadStage, GetLeadsParams> {
  renderCard: (lead: T) => ReactNode;
  createSheetComponent?: ReactNode;
  queryHook: (params: GetLeadsParams, enabled: boolean) => any;
}

function BoardItemContent<T extends Lead>({
  lead,
  renderCard
}: {
  lead: T;
  renderCard: (lead: T) => ReactNode;
}) {
  return (
    <BoardItem id={lead.id} draggable>
      {renderCard(lead)}
    </BoardItem>
  );
}

const MemoizedBoardItem = memo(BoardItemContent) as typeof BoardItemContent;

export function LeadBoardColumn<T extends Lead>({
  id,
  color,
  title,
  canCreateLead,
  filters = [],
  renderCard,
  createSheetComponent,
  queryHook
}: LeadBoardColumnProps<T>) {
  const { mutateAsync } = useMoveLeadMutation();
  const {
    data: leadsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useLeads<T>(id, queryHook);

  const leads =
    leadsData?.pages.flatMap((page: PaginatedResponse<T>) => page.results) ||
    [];
  const count = leadsData?.pages[0]?.totalResults || 0;

  const handleDrop = async (leadId: string) => {
    await mutateAsync({ leadId, targetStage: id });
  };

  return (
    <BoardColumn
      id={id}
      onDrop={handleDrop}
      className="w-fit border-0 flex-shrink-0 transition-all bg-transparent overflow-y-hidden overflow-x-hidden min-h-[calc(100vh-100px)] flex flex-col"
    >
      <BoardColumnHeader className="flex-row justify-between">
        <div className="flex gap-2 items-center">
          <Badge className={`${color} rounded-full size-3 p-0`} />
          <span className="text-lg font-semibold tracking-tight truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Badge className="bg-primary/30 text-primary">{count}</Badge>
          {canCreateLead && createSheetComponent}
        </div>
      </BoardColumnHeader>

      <BoardColumnFilters className="px-4 py-2 border-none flex w-full">
        <ColumnFilterMenu columnId={id} options={filters} />
      </BoardColumnFilters>

      <div className="flex w-[300px] md:w-[340px]  xl:w-[380px] 3xl:w-[420px] flex-col pt-4 pb-4 px-4 flex-1 overflow-y-auto no-scrollbar relative">
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
          <>
            {leads.map((lead: T) => (
              <MemoizedBoardItem
                key={lead.id}
                lead={lead}
                renderCard={renderCard}
              />
            ))}

            {hasNextPage && (
              <div className="mt-4 mb-4 flex justify-center w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="w-full border-dashed"
                >
                  {isFetchingNextPage ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </BoardColumn>
  );
}
