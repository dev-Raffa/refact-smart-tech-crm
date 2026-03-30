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

type ServantBoardColumnProps = {
  id: LeadStage;
  title: string;
};

export function ServantBoardColumn({ id, title }: ServantBoardColumnProps) {
  const { leads, isLoading, handleDrop, StageBadgeColor, count } =
    useServantsBoard({ stageId: id });

  return (
    <BoardColumn
      id={id}
      onDrop={handleDrop}
      className="w-fit  flex-shrink-0 transition-all bg-transparent overflow-y-auto overflow-x-hidden min-h-[calc(100vh-100px)]"
    >
      <BoardColumnHeader className="flex-row justify-between">
        <div className="flex gap-2 items-center">
          <Badge className={`${StageBadgeColor[id]} rounded-full size-3 p-0`} />
          <span className="text-lg font-semibold tracking-tight truncate">
            {title}
          </span>
        </div>
        <div>
          <Badge variant={'secondary'}>{count}</Badge>
        </div>
      </BoardColumnHeader>

      <BoardColumnFilters className="py-0 px-0 mb-3 border-none flex">
        <span className="hidden">Filters placeholder</span>
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
