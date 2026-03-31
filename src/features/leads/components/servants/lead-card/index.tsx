import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, MessageSquare, Settings } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { maskDocument } from '@/shared/utils/masks/mask-document';

import type {
  Lead,
  LeadPublicServantFlowName
} from '../../../types/lead.model';
import { PublicServantsLeadDetails } from '../lead-detail';

import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';
import {
  useChangeOperatorMutation,
  useSetReceivingAssistanceFlagMutation,
  useOpenHuggyChatMutation
} from '../../../hooks/use-mutations';

import { PublicServantTags } from './public-servant-tags';
import { PublicServantsMarketingTags } from './marketing-tags';
import { formatCurrencyBRL, formatDate } from '@/shared/utils';
import { PublciServantLastStepBadge } from '../last-step-badge';
import { PublicServantFlagsBadge } from '../flags-badge';
import { PublicServantFinalizationReasonBadge } from '../finalization-reason-badge';

function keepFirstAndLastName(fullName?: string | null) {
  if (!fullName) return '';
  const names = fullName.trim().split(/\s+/);
  if (names.length <= 1) return names[0] ?? '';
  return `${names[0]} ${names[names.length - 1]}`;
}

type PublicServantLeadCardProps = {
  lead: Lead;
};

export function PublicServantLeadCard({ lead }: PublicServantLeadCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { availableOperators: operators } = useLeadsBoardContext();

  const changeOperatorMutation = useChangeOperatorMutation();
  const setAssistanceFlagMutation = useSetReceivingAssistanceFlagMutation();
  const openHuggyChatMutation = useOpenHuggyChatMutation();

  const handleCopyCpf = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lead.customer?.cpf) {
      navigator.clipboard.writeText(lead.customer.cpf);
      toast.success('CPF Copiado!');
    } else {
      toast.warning('Este lead não possui um CPF cadastrado.');
    }
  };

  const openFlowSheet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSheetOpen(true);
  };

  const openHuggyChat = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (lead.stageName === 'NewLead' && !lead.lastFlow?.receivingAssistance) {
      setAssistanceFlagMutation.mutate(lead.id);
    }

    try {
      await openHuggyChatMutation.mutateAsync(lead.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeOperator = (operatorId: string) => {
    const operator = operators.find((op: any) => op.id === operatorId);

    if (!operator) {
      return;
    }

    changeOperatorMutation.mutate({
      leadId: lead.id,
      operator: {
        id: operator.id,
        name: operator.name,
        username: operator.username
      }
    });
  };

  const currentOperatorId = lead.operator?.id ?? '';
  const isCurrentInList =
    lead.operator && operators.some((op: any) => op.id === lead.operator?.id);
  const displayOperators =
    !isCurrentInList && lead.operator
      ? [lead.operator, ...operators]
      : operators;

  return (
    <>
      <Card
        className="w-full relative group mb-3 shadow cursor-pointer hover:shadow-md transition-all flex flex-col justify-between h-76"
        onClick={openFlowSheet}
      >
        <CardHeader className="flex justify-between w-full">
          <div className="flex w-5/10 flex-col gap-1 items-start">
            <div className="flex items-center gap-1 w-full relative min-w-0">
              <h3
                className="font-semibold text-sm leading-tight truncate text-zinc-900 dark:text-zinc-100 flex-1 min-w-0"
                title={lead.customer?.name}
              >
                {keepFirstAndLastName(lead.customer?.name)}
              </h3>
            </div>
            <div className=" flex items-center gap-1 text-xs text-muted-foreground hover:text-emerald-700 transition-colors truncate w-full">
              {lead.customer?.cpf ? (
                <>
                  {maskDocument(lead.customer.cpf)}
                  <Button
                    className="p-0 h-fit w-fit"
                    type="button"
                    size={'icon-sm'}
                    variant={'ghost'}
                    onClick={handleCopyCpf}
                  >
                    <Copy className="size-3" />
                  </Button>
                </>
              ) : (
                'CPF Não informado'
              )}
            </div>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">
              {formatDate(lead.date)}
            </span>
          </div>
          <div className="flex flex-col items-end shrink-0 gap-1.5">
            <span className="font-bold text-sm leading-tight text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
              {formatCurrencyBRL(lead.availableBalance)}
            </span>
            <div className="flex flex-col items-end gap-1">
              <PublciServantLastStepBadge
                step={lead.lastFlow.flowName as LeadPublicServantFlowName}
                status={lead.lastFlow.status}
              />
              <PublicServantFlagsBadge lead={lead} />
              {lead.finalizationReason !== 'None' && (
              <PublicServantFinalizationReasonBadge finalizationReason={lead.finalizationReason} />
            )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1 w-full pb-1">
            <PublicServantTags lead={lead} />
            <PublicServantsMarketingTags lead={lead} />
          </div>

          <div className="flex justify-between items-end gap-3 pt-2 w-full">
            <div
              className="w-full max-w-[160px] min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Select
                onValueChange={handleChangeOperator}
                defaultValue={currentOperatorId}
              >
                <SelectTrigger className="h-8 border-none shadow-none hover:bg-muted transition-colors p-0 px-2 mt-1 text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                  <SelectValue
                    placeholder={lead.operator?.name || 'Sem operador'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                      Operadores
                    </SelectLabel>
                    {displayOperators.map((op: any) => (
                      <SelectItem
                        key={op.id}
                        value={op.id}
                        className="cursor-pointer text-emerald-600 dark:text-emerald-400 font-medium text-xs"
                      >
                        {op.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex p-4 pt-0 gap-2">
          <Button
            onClick={openHuggyChat}
            variant="outline"
            disabled={openHuggyChatMutation.isPending}
            className="h-8 flex-1 bg-zinc-50 hover:bg-zinc-100 text-xs text-zinc-600 dark:bg-zinc-900 border-zinc-200"
          >
            Chat
            <MessageSquare className="w-3.5 h-3.5 ml-1.5" />
          </Button>
          <Button
            onClick={openFlowSheet}
            variant="outline"
            className="h-8 flex-1 bg-zinc-50 hover:bg-zinc-100 text-xs text-zinc-600 dark:bg-zinc-900 border-zinc-200"
          >
            Ações
            <Settings className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </CardFooter>
      </Card>

      {isSheetOpen && (
        <PublicServantsLeadDetails
          leadId={lead.id}
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        />
      )}
    </>
  );
}
