import { Loader2 } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/shared/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion';

import { useLeadCustomerDetailsQuery } from '../../../hooks/use-queries';

import { CustomerDataSection } from './sections/customer-data';
import { ServantDataSection } from './sections/servant-data';
import { PaycheckUploadSection } from './sections/paycheck-upload';
import { PaycheckDownloadSection } from './sections/paycheck-download';

type InssLeadSheetProps = {
  leadId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PublicServantsLeadDetails({
  leadId,
  isOpen,
  onOpenChange
}: InssLeadSheetProps) {
  const { data: leadDetails, isLoading: isLeadLoading } =
    useLeadCustomerDetailsQuery(leadId);
  console.log(leadDetails);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex p-4 flex-col sm:max-w-md w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <SheetHeader className="px-4 pt-6 pb-2">
          <SheetTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
            Detalhes do Simulação
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
          {isLeadLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : !isLeadLoading && leadDetails ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="dados-cliente"
                className="border-zinc-200 dark:border-zinc-800"
              >
                <AccordionTrigger className="text-sm font-semibold hover:text-emerald-700 dark:hover:text-emerald-400">
                  Dados do cliente
                </AccordionTrigger>
                <AccordionContent>
                  <CustomerDataSection
                    leadDetails={leadDetails}
                    leadId={leadId}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="dados-servidor"
                className="border-zinc-200 dark:border-zinc-800"
              >
                <AccordionTrigger className="text-sm font-semibold hover:text-emerald-700 dark:hover:text-emerald-400">
                  Servidor público
                </AccordionTrigger>
                <AccordionContent>
                  <ServantDataSection
                    servantDetails={leadDetails.publicServantDetails}
                  />
                </AccordionContent>
              </AccordionItem>

              {leadDetails.payslip ? (
                <AccordionItem value="get-contracheque">
                  <AccordionTrigger>Baixar contracheque</AccordionTrigger>
                  <AccordionContent>
                    <PaycheckDownloadSection leadId={leadId} />
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <AccordionItem value="send-contracheque">
                  <AccordionTrigger>Enviar contracheque</AccordionTrigger>
                  <AccordionContent>
                    <PaycheckUploadSection leadId={leadId} />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              Não foi possível carregar os detalhes.
            </div>
          )}
          {/*

          <div className="w-full flex flex-col gap-4 mt-8">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">Histórico Execução</h3>
            {flowStepsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
              </div>
            ) : flowSteps && flowSteps.length > 0 ? (
              <div className="space-y-3">
                {flowSteps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{step.flowName}</span>
                      <span className="text-[10px] text-zinc-400">{new Date(step.executedAt).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{step.bank}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500 text-center py-4 bg-zinc-50/50 rounded-lg">Sem histórico.</p>
            )}
          </div>
          */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
