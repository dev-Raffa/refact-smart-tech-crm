import {
  Loader2,
  User,
  Building2,
  Landmark,
  Search,
  FileText
} from 'lucide-react';
import { Sheet, SheetContent } from '@/shared/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion';

import { useLeadDetailsQuery } from '../../../hooks/use-queries';
import { LeadFluxHistory } from '../../flux-history';
import { CltCustomerData } from './sections/clt-customer-data';
import { CltDataSection } from './sections/clt-data';
import { OffersDataSection } from './sections/offers-data';
import { AdditionalDataSection } from './sections/additional-data';
import { formatCurrencyBRL, formatDateOnly } from '@/shared/utils';
import { CopyButton } from '@/shared/components/global/copy-button';
import { getFirstNameAndLastName } from '@/shared/utils/get-first-&-last-name';

type CltLeadSheetProps = {
  leadId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance?: number;
};

export function CltLeadDetails({
  leadId,
  isOpen,
  onOpenChange,
  availableBalance
}: CltLeadSheetProps) {
  const { data: leadDetails, isLoading: isLeadLoading } =
    useLeadDetailsQuery(leadId);

  const displayName = getFirstNameAndLastName(leadDetails?.customer.name);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex p-0 flex-col w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        {!isLeadLoading && leadDetails ? (
          <>
            <div className="px-4 pt-10 pb-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
              <div className="flex items-center justify-between">
                <div className="w-7/10">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {displayName.first}{' '}
                    <span className="text-zinc-500 font-medium">
                      {displayName.last}
                    </span>
                  </h2>
                  <div className="flex w-full items-center gap-1 text-nowrap text-xs text-zinc-500 font-mono">
                    <span>{leadId}</span>
                    <CopyButton
                      copy={leadId}
                      successText="ID Copiado!"
                      errorText="ID não disponível"
                      className="h-4 w-4"
                    />
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-500 tabular-nums">
                    {formatCurrencyBRL(availableBalance || 0)}
                  </p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    {formatDateOnly(leadDetails.customer.creationDate || '')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar space-y-8">
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-4"
                defaultValue="dados-pessoais"
              >
                <AccordionItem value="dados-pessoais" className="border-none">
                  <AccordionTrigger className="py-3 px-4 rounded-xl hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border border-zinc-200 dark:border-zinc-800 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <User className="h-4 w-4 text-red-700" />
                      Dados Pessoais
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-2 px-1">
                    <CltCustomerData leadDetails={leadDetails} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="dados-trabalhistas"
                  className="border-none"
                >
                  <AccordionTrigger className="py-3 px-4 rounded-xl hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border border-zinc-200 dark:border-zinc-800 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Building2 className="h-4 w-4 text-red-700" />
                      Dados Trabalhistas
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2 px-1">
                    <CltDataSection cltDetails={leadDetails.cltDetails} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ofertas-bancos" className="border-none">
                  <AccordionTrigger className="py-3 px-4 rounded-xl hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border border-zinc-200 dark:border-zinc-800 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Landmark className="h-4 w-4 text-red-700" />
                      Propostas e Ofertas
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2 px-1">
                    <OffersDataSection offers={leadDetails.offers} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dados-adicionais" className="border-none">
                  <AccordionTrigger className="py-3 px-4 rounded-xl hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border border-zinc-200 dark:border-zinc-800 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Search className="h-4 w-4 text-red-700" />
                      Dados Adicionais
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2 px-1">
                    <AdditionalDataSection leadDetails={leadDetails} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="px-4 space-y-4 pt-0">
                <LeadFluxHistory flowSteps={leadDetails.history} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
            {isLeadLoading ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin text-red-700" />
                <p className="text-zinc-500 font-medium animate-pulse">
                  Carregando detalhes do lead...
                </p>
              </>
            ) : (
              <div className="text-center space-y-2">
                <FileText className="h-12 w-12 text-zinc-200 mx-auto" />
                <p className="text-zinc-500 font-medium">
                  Não foi possível carregar os detalhes.
                </p>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
