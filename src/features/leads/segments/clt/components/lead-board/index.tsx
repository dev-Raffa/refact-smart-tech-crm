import { Separator } from '@/shared/components/ui/separator';
import { StageBadgeColor } from '@/features/leads/consts/stage-badge-color';
import type {
  GetLeadsParams,
  LeadStage
} from '@/features/leads/types/lead.model';
import type { IBoardColumnConfig } from '@/shared/components/common/board/types';

import { CreateCltLeadSheet } from '../actions/create-lead';
import { CltLeadCard } from '../lead-card';
import { useCltLeadsQuery } from '../../hooks/use-queries';
import { LeadsBoardLayout } from '@/features/leads/components/lead-board';
import { LeadBoardColumn } from '@/features/leads/components/lead-board/column';
import type { CltLead } from '../../types/models';

const CLT_COLUMNS: IBoardColumnConfig<LeadStage, GetLeadsParams>[] = [
  {
    id: 'NewLead',
    title: 'Novo Lead',
    color: StageBadgeColor['NewLead'],
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
    title: 'Assinatura',
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
    id: 'Payed',
    title: 'Pagamento',
    color: StageBadgeColor['Payed'],
    canCreateLead: true,
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

export const CLTLeadBoard = () => {
  return (
    <LeadsBoardLayout segment="Clt">
      {CLT_COLUMNS.map((col, index: number) => (
        <>
          <LeadBoardColumn<CltLead>
            key={col.id}
            id={col.id}
            title={col.title}
            filters={col.filters}
            color={col.color}
            canCreateLead={col.canCreateLead}
            createSheetComponent={<CreateCltLeadSheet />}
            queryHook={useCltLeadsQuery}
            renderCard={(lead) => <CltLeadCard lead={lead} />}
          />
          {index !== CLT_COLUMNS.length - 1 && (
            <Separator orientation="vertical" />
          )}
        </>
      ))}
    </LeadsBoardLayout>
  );
};
