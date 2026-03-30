import { useState } from 'react';
import {
  Board,
  BoardColumn,
  BoardColumnHeader,
  BoardColumnFilters,
  BoardItem,
  BoardEmpty
} from '@/shared/components/global/board';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/shared/components/ui/sheet';
import { Badge, MessageCircle, MoreHorizontal, SearchIcon } from 'lucide-react';

interface MockLead {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  stage: string;
}

const INITIAL_LEADS: MockLead[] = [
  {
    id: '1',
    name: 'Rafael Souza',
    cpf: '123.456.789-00',
    phone: '(11) 91234-5678',
    stage: 'new-lead'
  },
  {
    id: '2',
    name: 'Mariana Lima',
    cpf: '987.654.321-00',
    phone: '(21) 99876-5432',
    stage: 'new-lead'
  },
  {
    id: '3',
    name: 'Carlos Pereira',
    cpf: '111.222.333-44',
    phone: '(31) 98765-4321',
    stage: 'new-lead'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    cpf: '222.333.444-55',
    phone: '(41) 97654-3210',
    stage: 'negotiation'
  },
  {
    id: '5',
    name: 'Roberto Costa',
    cpf: '333.444.555-66',
    phone: '(51) 96543-2109',
    stage: 'negotiation'
  },
  {
    id: '6',
    name: 'Juliana Ferreira',
    cpf: '444.555.666-77',
    phone: '(61) 95432-1098',
    stage: 'proposal'
  },
  {
    id: '7',
    name: 'Pedro Martins',
    cpf: '555.666.777-88',
    phone: '(71) 94321-0987',
    stage: 'proposal'
  },
  {
    id: '8',
    name: 'Beatriz Alves',
    cpf: '666.777.888-99',
    phone: '(81) 93210-9876',
    stage: 'sale'
  },
  {
    id: '9',
    name: 'Lucas Rodrigues',
    cpf: '777.888.999-00',
    phone: '(11) 92109-8765',
    stage: 'sale'
  },
  {
    id: '10',
    name: 'Fernanda Santos',
    cpf: '888.999.000-11',
    phone: '(21) 91098-7654',
    stage: 'follow-up'
  },
  {
    id: '11',
    name: 'Gustavo Cardoso',
    cpf: '999.000.111-22',
    phone: '(31) 90987-6543',
    stage: 'follow-up'
  },
  {
    id: '12',
    name: 'Larissa Mendes',
    cpf: '000.111.222-33',
    phone: '(41) 98876-5432',
    stage: 'disqualified'
  },
  {
    id: '13',
    name: 'Thiago Rocha',
    cpf: '111.333.555-77',
    phone: '(51) 97765-4321',
    stage: 'disqualified'
  }
];

const STAGES = [
  { id: 'new-lead', label: 'New Lead' },
  { id: 'negotiation', label: 'Negociação' },
  { id: 'proposal', label: 'Proposta' },
  { id: 'follow-up', label: 'Follow Up' },
  { id: 'sale', label: 'Venda' },
  { id: 'disqualified', label: 'Desqualificado' },
  { id: 'archived', label: 'Arquivado' }
];

export function BoardTestPage() {
  const [leads, setLeads] = useState<MockLead[]>(INITIAL_LEADS);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sheetLead, setSheetLead] = useState<MockLead | null>(null);

  const handleDrop = (itemId: string, columnId: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === itemId ? { ...lead, stage: columnId } : lead
      )
    );
  };

  const handleFilter = (stageId: string, value: string) => {
    setFilters((prev) => ({ ...prev, [stageId]: value }));
  };

  const getStageLeads = (stageId: string) => {
    const query = filters[stageId]?.toLowerCase() ?? '';
    return leads
      .filter((lead) => lead.stage === stageId)
      .filter(
        (lead) =>
          !query ||
          lead.name.toLowerCase().includes(query) ||
          lead.cpf.includes(query)
      );
  };

  const handleChat = (lead: MockLead) => {
    window.open(`https://example.com/chat/${lead.id}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6 h-full">
      <div className="flex flex-col gap-1 pb-2">
        <h2 className="text-2xl font-semibold">Board – Página de Teste</h2>
        <p className="text-muted-foreground text-sm">
          Teste visual do componente global{' '}
          <code className="bg-muted px-1 rounded text-xs">Board</code>. Arraste
          os cards entre as colunas.
        </p>
      </div>

      <Board>
        {STAGES.map((stage) => {
          const stageLeads = getStageLeads(stage.id);

          return (
            <BoardColumn key={stage.id} id={stage.id} onDrop={handleDrop}>
              <BoardColumnHeader>
                <div>
                  {stage.label}
                  <Badge>{leads.length}</Badge>
                </div>
              </BoardColumnHeader>
              <BoardColumnFilters>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar lead..."
                    className="pl-8 h-8 text-xs"
                    value={filters[stage.id] ?? ''}
                    onChange={(e) => handleFilter(stage.id, e.target.value)}
                  />
                </div>
              </BoardColumnFilters>

              <div className="flex flex-col gap-2 p-2 flex-1 overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <BoardEmpty message="Sem leads nesta etapa." />
                ) : (
                  stageLeads.map((lead) => (
                    <BoardItem key={lead.id} id={lead.id}>
                      <div className="rounded-md border bg-background p-3 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium truncate">
                            {lead.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lead.cpf}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lead.phone}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs flex-1 gap-1"
                            onClick={() => handleChat(lead)}
                          >
                            <MessageCircle className="h-3 w-3" />
                            Chat
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs flex-1 gap-1"
                            onClick={() => setSheetLead(lead)}
                          >
                            <MoreHorizontal className="h-3 w-3" />
                            Ações
                          </Button>
                        </div>
                      </div>
                    </BoardItem>
                  ))
                )}
              </div>
            </BoardColumn>
          );
        })}
      </Board>

      <Sheet
        open={!!sheetLead}
        onOpenChange={(open) => !open && setSheetLead(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{sheetLead?.name}</SheetTitle>
            <SheetDescription>
              {sheetLead?.cpf} — {sheetLead?.phone}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Ações disponíveis para este lead:
            </p>
            <Button variant="outline" className="justify-start">
              Editar informações
            </Button>
            <Button variant="outline" className="justify-start">
              Criar simulação
            </Button>
            <Button variant="outline" className="justify-start">
              Registrar atividade
            </Button>
            <Button
              variant="outline"
              className="justify-start text-destructive hover:text-destructive"
            >
              Desqualificar lead
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
