import { Play, RefreshCw } from 'lucide-react';

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
import type { AvailableFlow, FlowFormState } from '../../../types/flow.types';
import { FLOW_IDS } from '../../../types/flow.types';
import type { Lead, LeadStage } from '../../../types/lead.model';

interface FlowCardProps {
  lead: Lead;
  flow: AvailableFlow;
  state: FlowFormState;
  isExecuting: boolean;
  onExecute: (flow: AvailableFlow) => void;
  onFormChange: (flowId: string, data: Partial<FlowFormState>) => void;
}

export function FlowCard({
  lead,
  flow,
  state,
  isExecuting,
  onExecute,
  onFormChange
}: FlowCardProps) {
  const requiresReason =
    flow.flowId === FLOW_IDS.FINALIZATION ||
    flow.flowId === FLOW_IDS.DISQUALIFICATION;

  const isStageChange =
    flow.flowId === FLOW_IDS.STAGE_CHANGE && lead.stageName !== 'Signature';
  const leadStage = lead.stageName !== 'NewLead' ? lead.stageName : '';

  if (isStageChange) {
    return (
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-none py-3 gap-y-4">
        <CardHeader className="px-3">
          <CardTitle className="text-sm font-semibold">{flow.title}</CardTitle>
          <CardDescription className="text-xs line-clamp-2">
            {flow.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <Select
              value={state.stage ?? leadStage ?? ''}
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
        </CardContent>
      </Card>
    );
  }

  return (
    requiresReason && (
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-none py-3 gap-y-4">
        <CardHeader className="px-3">
          <CardTitle className="text-sm font-semibold">{flow.title}</CardTitle>
          <CardDescription className="text-xs line-clamp-2">
            {flow.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <Select
              value={state.reason ?? ''}
              onValueChange={(v) =>
                onFormChange(flow.id, { reason: v as LeadFinalizationReason })
              }
            >
              <SelectTrigger className="h-9 text-xs w-full">
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
        </CardContent>
      </Card>
    )
  );
}
