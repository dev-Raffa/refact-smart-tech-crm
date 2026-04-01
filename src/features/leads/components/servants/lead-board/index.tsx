import { Board } from '@/shared/components/global/board';
import { ServantBoardColumn } from './servants-board-column';
import { LeadsBoardProvider } from '../../../hooks/use-leads-board-context';
import { LeadsFilters } from '../../leads-filters';
import type { LeadStage, GetLeadsParams } from '../../../types/lead.model';
import { Separator } from '@/shared/components/ui/separator';
import type { IBoardColumnConfig } from '@/shared/components/global/board/types';
import { StageBadgeColor } from '@/features/leads/consts/stage-badge-color';

const SERVANT_COLUMNS: IBoardColumnConfig<LeadStage, GetLeadsParams>[] = [
  {
    id: 'NewLead',
    title: 'Novo Lead',
    color: StageBadgeColor['NewLead'],
    canCreateLead: true,
    filters: [
      { label: 'Cadência', value: { withCadence: true } },
      {
        label: 'Precisa de assistência',
        value: { includeNeedAssistence: true }
      },
      { label: 'Finalizado', value: { includeFinalized: true } },
      { label: 'Em atendimento', value: { withReceivingAssistance: true } }
    ]
  },
  {
    id: 'Negotiation',
    color: StageBadgeColor['Negotiation'],
    title: 'Negociação',
    filters: [
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
    ]
  },
  {
    id: 'Signature',
    color: StageBadgeColor['Signature'],
    title: 'Venda',
    filters: [
      {
        label: 'Precisa de assistência',
        value: { includeNeedAssistence: true }
      },
      { label: 'Finalizado', value: { includeFinalized: true } },
      { label: 'Em atendimento', value: { withReceivingAssistance: true } }
    ]
  },
  {
    id: 'EmptyBalance',
    color: StageBadgeColor['EmptyBalance'],
    title: 'Desqualificado'
  }
];


export function PublicServantLeadBoard() {
  return (
    <LeadsBoardProvider defaultProducts={['Inss']}>
      <div className="flex h-full flex-col flex-1 pb-6 w-full max-w-full overflow-hidden">
        <div className="mb-6">
          <LeadsFilters />
        </div>
        <Board>
          {SERVANT_COLUMNS.map((col, index: number) => (
            <>
              <ServantBoardColumn
                key={col.id}
                id={col.id}
                title={col.title}
                filters={col.filters}
                color={col.color}
                canCreateLead={col.canCreateLead}
              />
              {index !== SERVANT_COLUMNS.length - 1 && (
                <Separator orientation="vertical" />
              )}
            </>
          ))}
        </Board>
      </div>
    </LeadsBoardProvider>
  );
}
