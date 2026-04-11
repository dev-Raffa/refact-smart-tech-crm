import { Play } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet';

import { FlowsContent } from './flows-content';
import type { PublicServantLead } from '../../../types/models';

export const PublicServantFlowExecution = ({
  lead
}: {
  lead: PublicServantLead;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'outline'}
          className="w-full h-8 flex-1 bg-zinc-50 hover:bg-zinc-100 text-xs text-zinc-600 dark:text-zinc-300 dark:bg-zinc-900 border-zinc-200"
        >
          Ações
          <Play className="w-4 h-4 ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="pb-6 border-zinc-100 dark:border-zinc-800">
          <SheetTitle className="text-xl font-bold">Executar Fluxos</SheetTitle>
          <SheetDescription className="text-zinc-500 dark:text-zinc-400">
            Executar fluxos manualmente para o cliente:{' '}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {lead.customer.name}
            </span>
          </SheetDescription>
        </SheetHeader>

        <FlowsContent lead={lead} />
      </SheetContent>
    </Sheet>
  );
};
