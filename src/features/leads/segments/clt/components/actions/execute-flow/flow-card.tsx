import { Play, RefreshCw } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { maskDocument } from '@/shared/utils/masks/mask-document';
import type { Lead, LeadStage } from '@/features/leads/types/lead.model';
import {
  FLOW_IDS,
  type AvailableFlow,
  type FlowExecutionResult,
  type FlowFormState
} from '@/features/leads/types/flow.types';
import {
  LeadFinalizationReasons,
  type LeadFinalizationReason
} from '@/features/leads/consts/finalization-reasons';
import { LeadCltFinalizationReasons } from '../../../consts/finalization-reasons';

interface FlowCardProps {
  lead: Lead;
  flow: AvailableFlow;
  state: FlowFormState;
  isExecuting: boolean;
  result?: FlowExecutionResult;
  onExecute: (flow: AvailableFlow) => void;
  onFormChange: (flowId: string, data: Partial<FlowFormState>) => void;
}

export function FlowCard({
  lead,
  flow,
  state,
  isExecuting,
  result,
  onExecute,
  onFormChange
}: FlowCardProps) {
  const requiresReason =
    flow.flowId === FLOW_IDS.FINALIZATION ||
    flow.flowId === FLOW_IDS.DISQUALIFICATION;

  const isStageChange = flow.flowId === FLOW_IDS.STAGE_CHANGE;
  const isCpfConsultation = flow.flowId === FLOW_IDS.CPF_CONSULTATION;
  const isFormalizationLink = flow.flowId === FLOW_IDS.FORMALIZATION_LINK;

  const currentStage = lead.stageName;

  return (
    <Card className="border-zinc-200 dark:border-zinc-800 shadow-none p-4">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="text-sm font-semibold">{flow.title}</CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {flow.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-start-1">
            {requiresReason && (
              <Select
                value={state.reason ?? ''}
                onValueChange={(v) =>
                  onFormChange(flow.id, { reason: v as LeadFinalizationReason })
                }
              >
                <SelectTrigger className="h-9 text-xs w-full">
                  <SelectValue placeholder="Motivo" />
                </SelectTrigger>
                <SelectContent>
                  {flow.flowId === FLOW_IDS.FINALIZATION &&
                    Object.entries(LeadCltFinalizationReasons).map(
                      ([key, label]) => (
                        <SelectItem key={key} value={key} className="text-xs">
                          {label}
                        </SelectItem>
                      )
                    )}
                  {flow.flowId === FLOW_IDS.DISQUALIFICATION &&
                    Object.entries(LeadFinalizationReasons).map(
                      ([key, label]) => (
                        <SelectItem key={key} value={key} className="text-xs">
                          {label}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            )}

            {isStageChange && (
              <Select
                value={state.stage ?? currentStage}
                onValueChange={(v) =>
                  onFormChange(flow.id, { stage: v as LeadStage })
                }
              >
                <SelectTrigger className="h-9 text-xs w-full">
                  <SelectValue placeholder="Coluna" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NewLead" className="text-xs">
                    Novo Lead
                  </SelectItem>
                  <SelectItem value="Negotiation" className="text-xs">
                    Negociação
                  </SelectItem>
                  <SelectItem value="Signature" className="text-xs">
                    Venda
                  </SelectItem>
                  <SelectItem value="Payed" className="text-xs">
                    Pago
                  </SelectItem>
                  <SelectItem value="EmptyBalance" className="text-xs">
                    Desqualificado
                  </SelectItem>
                </SelectContent>
              </Select>
            )}

            {isCpfConsultation && (
              <Input
                placeholder="Digite o CPF"
                value={state.cpf ?? ''}
                onChange={(e) =>
                  onFormChange(flow.id, { cpf: maskDocument(e.target.value) })
                }
                className="h-9 text-xs w-full"
                maxLength={14}
              />
            )}

            {isFormalizationLink && (
              <Input
                placeholder="URL de Formalização"
                value={state.formalizationUrl ?? ''}
                onChange={(e) =>
                  onFormChange(flow.id, { formalizationUrl: e.target.value })
                }
                className="h-9 text-xs w-full"
              />
            )}
          </div>

          <Button
            size="sm"
            disabled={isExecuting}
            onClick={() => onExecute(flow)}
            className="col-start-2 w-full h-9"
          >
            {isExecuting ? (
              <RefreshCw className="w-3 h-3 animate-spin mr-2" />
            ) : (
              <Play className="w-3 h-3 mr-2" />
            )}
            <span className="text-xs">
              {isExecuting ? 'Executando...' : 'Executar'}
            </span>
          </Button>
        </div>

        {result && (
          <div className="pt-2">
            <Badge
              variant="outline"
              className="text-[10px] py-0.5 px-2 font-normal bg-zinc-50 border-zinc-200 text-zinc-600 block w-fit truncate max-w-full"
            >
              Resultado: {result.reason}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
