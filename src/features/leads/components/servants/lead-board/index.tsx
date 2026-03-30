import { Board } from '@/shared/components/global/board';
import { ServantBoardColumn } from './servants-board-column';
import { LeadsBoardProvider } from '../../../hooks/use-leads-board-context';
import { LeadsFilters } from '../../leads-filters';
import type { LeadStage } from '../../../types/lead.model';

type InssColumnDefinition = {
  id: LeadStage;
  title: string;
};

const INSS_COLUMNS: InssColumnDefinition[] = [
  { id: 'NewLead', title: 'Novo Lead' },
  { id: 'Negotiation', title: 'Negociação' },
  { id: 'Signature', title: 'Venda' },
  { id: 'EmptyBalance', title: 'Desqualificado' }
];

export function PublicServantLeadBoard() {
  return (
    <LeadsBoardProvider defaultProducts={['Inss']} operatorRole="PublicServant">
      <div className="flex h-full flex-col flex-1 pb-6 w-full max-w-full overflow-hidden">
        <div className="mb-4">
          <LeadsFilters />
        </div>
        <Board>
          {INSS_COLUMNS.map((col) => (
            <ServantBoardColumn key={col.id} id={col.id} title={col.title} />
          ))}
        </Board>
      </div>
    </LeadsBoardProvider>
  );
}
