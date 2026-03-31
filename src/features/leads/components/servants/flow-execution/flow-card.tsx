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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';

import {
  LeadPublicServantFinalizationReasons,
  LeadPublicServantDisqualificationReasons
} from '../../../consts/finalization-reasons';
import type { LeadFinalizationReason } from '../../../consts/finalization-reasons';
import type {
  AvailableFlow,
  FlowExecutionResult,
  FlowFormState
} from '../../../types/flow.types';
import { FLOW_IDS } from '../../../types/flow.types';
import type { LeadStage } from '../../../types/lead.model';

interface FlowCardProps {
  flow: AvailableFlow;
  state: FlowFormState;
  isExecuting: boolean;
  result?: FlowExecutionResult;
  onExecute: (flow: AvailableFlow) => void;
  onFormChange: (flowId: string, data: Partial<FlowFormState>) => void;
}

export function FlowCard({
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

  return (
    <Card className="border-zinc-200 dark:border-zinc-800 shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">{flow.title}</CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {flow.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {requiresReason && (
          <div className="grid grid-cols-2 gap-8 items-center">
            <Select
              value={state.reason ?? ''}
              onValueChange={(v) =>
                onFormChange(flow.id, { reason: v as LeadFinalizationReason })
              }
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                {flow.flowId === FLOW_IDS.FINALIZATION &&
                  Object.entries(LeadPublicServantFinalizationReasons).map(
                    ([key, label]) => (
                      <SelectItem key={key} value={key} className="text-xs">
                        {label}
                      </SelectItem>
                    )
                  )}
                {flow.flowId === FLOW_IDS.DISQUALIFICATION &&
                  Object.entries(LeadPublicServantDisqualificationReasons).map(
                    ([key, label]) => (
                      <SelectItem key={key} value={key} className="text-xs">
                        {label}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              disabled={isExecuting}
              onClick={() => onExecute(flow)}
              className="h-9 px-3"
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
        )}

        {isStageChange && (
          <div className="grid grid-cols-2 gap-8 items-center">
            <Select
              value={state.stage ?? ''}
              onValueChange={(v) =>
                onFormChange(flow.id, { stage: v as LeadStage })
              }
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Selecione a coluna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Negotiation" className="text-xs">
                  Negociação
                </SelectItem>
                <SelectItem value="Signature" className="text-xs">
                  Venda
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="sm"
              disabled={isExecuting}
              onClick={() => onExecute(flow)}
              className="h-9 px-3"
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
        )}

        {result && (
          <Badge
            variant="outline"
            className="text-[10px] py-0 h-5 font-normal bg-zinc-50 border-zinc-200 text-zinc-600"
          >
            {result.reason}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
