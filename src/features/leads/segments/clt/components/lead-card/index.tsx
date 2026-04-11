import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { maskDocument } from '@/shared/utils/masks/mask-document';

import { CltTags } from './clt-tags';

import { formatCurrencyBRL, formatDate } from '@/shared/utils';
import { CopyButton } from '@/shared/components/common/copy-button';
import { getFirstNameAndLastName } from '@/shared/utils/get-first-&-last-name';
import {
  useOpenHuggyChatMutation,
  useSetReceivingAssistanceFlagMutation
} from '@/features/leads/hooks/use-mutations';
import { CltLastStepBadge } from '../last-step-badge';
import type { LeadCltFlowName } from '../../consts/steps';
import { FlagsBadge } from '@/features/leads/components/badges/flag';
import { FinalizationReasonBadge } from '@/features/leads/components/badges/finalization-reason';
import { MarketingBadges } from '@/features/leads/components/badges/marketin';
import { LeadChangeOperator } from '@/features/leads/components/actions/change-operator';
import { CltLeadFlowExecution } from '../actions/execute-flow';
import { CltLeadDetails } from '../lead-detail';

import type { CltLead } from '../../types/models';

type CltLeadCardProps = {
  lead: CltLead;
};

export function CltLeadCard({ lead }: CltLeadCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const setAssistanceFlagMutation = useSetReceivingAssistanceFlagMutation();
  const openHuggyChatMutation = useOpenHuggyChatMutation();
  const { first, last } = getFirstNameAndLastName(lead.customer.name);
  const openFlowSheet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSheetOpen(true);
  };

  const openHuggyChat = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (lead.stageName === 'NewLead' && !lead.lastFlow.receivingAssistance) {
      setAssistanceFlagMutation.mutate(lead.id);
    }

    try {
      await openHuggyChatMutation.mutateAsync(lead.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        className="w-full relative py-4 group mb-3 shadow cursor-pointer hover:shadow-md transition-all flex flex-col gap-3 justify-between h-fit"
        onClick={openFlowSheet}
      >
        <CardHeader className="flex justify-between w-full">
          <div className="flex w-1/2 flex-col gap-1 items-start">
            <div className="flex items-center gap-1 w-full relative">
              <h3
                className="font-semibold text-sm leading-tight truncate text-zinc-900 dark:text-zinc-100"
                title={lead.customer.name}
              >
                {first} {last}
              </h3>
            </div>
            <div className=" flex items-center gap-1 text-xs text-muted-foreground hover:text-emerald-700 transition-colors truncate w-full">
              {maskDocument(lead.customer.cpf)}

              <CopyButton
                successText="CPF Copiado!"
                errorText="Este lead não possui um CPF cadastrado."
                copy={maskDocument(lead.customer.cpf)}
              />
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
              <CltLastStepBadge
                step={lead.lastFlow.flowName as LeadCltFlowName}
                status={lead.lastFlow.status}
              />
              <FlagsBadge lastFlow={lead.lastFlow} />
              <FinalizationReasonBadge
                finalizationReason={lead.finalizationReason}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-1 w-full items-center">
            <CltTags
              leadProducts={lead.products}
              approvedBank={lead.approvedBank}
            />
            <MarketingBadges marketing={lead.marketing} />
          </div>

          <div className="w-full " onClick={(e) => e.stopPropagation()}>
            <LeadChangeOperator leadId={lead.id} operator={lead.operator} />
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-2 px-6 py-0 gap-x-6 ">
          <Button
            onClick={openHuggyChat}
            variant="outline"
            disabled={openHuggyChatMutation.isPending}
            className="h-8 flex-1 bg-zinc-50 hover:bg-zinc-100 text-xs text-zinc-600 dark:bg-zinc-900 border-zinc-200"
          >
            Chat
            <MessageSquare className="w-3.5 h-3.5 ml-1.5" />
          </Button>
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <CltLeadFlowExecution lead={lead} />
          </div>
        </CardFooter>
      </Card>

      {isSheetOpen && (
        <CltLeadDetails
          leadId={lead.id}
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          availableBalance={lead.availableBalance}
        />
      )}
    </>
  );
}
