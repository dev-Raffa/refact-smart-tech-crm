import { Separator } from '@/shared/components/ui/separator';
import type { IBoardColumnConfig } from '@/shared/components/common/board/types';
import { StageBadgeColor } from '@/features/leads/consts/stage-badge-color';

import { PublicServantLeadCard } from '../lead-card';
import type {
  GetLeadsParams,
  LeadStage
} from '@/features/leads/types/lead.model';
import { LeadsBoardLayout } from '@/features/leads/components/lead-board';
import { LeadBoardColumn } from '@/features/leads/components/lead-board/column';
import { CreatePublicServantLeadSheet } from '../acitons/create-lead';
import { usePublicServantLeadsQuery } from '../../hooks/use-queries';
import type { PublicServantLead } from '../../types/models';

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
    <LeadsBoardLayout segment="PublicServant">
      {SERVANT_COLUMNS.map((col, index: number) => (
        <>
          <LeadBoardColumn<PublicServantLead>
            key={col.id}
            id={col.id}
            title={col.title}
            filters={col.filters}
            color={col.color}
            canCreateLead={col.canCreateLead}
            createSheetComponent={<CreatePublicServantLeadSheet />}
            queryHook={usePublicServantLeadsQuery}
            renderCard={(lead) => <PublicServantLeadCard lead={lead} />}
          />
          {index !== SERVANT_COLUMNS.length - 1 && (
            <Separator orientation="vertical" />
          )}
        </>
      ))}
    </LeadsBoardLayout>
  );
}
