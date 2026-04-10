import { PlusCircle } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/shared/components/ui/carousel';
import { Button } from '@/shared/components/ui/button';
import type { ProductOfferInformation } from '../../../types/models';
import { ApprovedBankCard } from '../cards/approved-bank-card';
import { RejectedBankCard } from '../cards/rejected-bank-card';

type OffersDataSectionProps = {
  offers?: ProductOfferInformation;
};

export function OffersDataSection({ offers }: OffersDataSectionProps) {
  if (!offers) {
    return (
      <div className="text-center py-10 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-muted-foreground px-4">
          Nenhum dado de oferta carregado.
        </p>
      </div>
    );
  }

  const hasAnyOffer = !!(
    offers.clt ||
    offers.fgts ||
    offers.pix ||
    offers.cas ||
    offers.crefaz
  );

  if (!hasAnyOffer) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-muted-foreground text-center px-4">
          Nenhuma proposta cadastrada para este produto.
        </p>
        <Button size="sm" variant="secondary" className="gap-2">
          <PlusCircle className="size-4" />
          Adicionar Proposta
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {offers.clt &&
      (offers.clt.approvedBanks?.length || offers.clt.failedBanks?.length) ? (
        <Carousel className="w-full px-1">
          <CarouselContent>
            {offers.clt.approvedBanks?.map((bank, index) => {
              const isActive = index === 0;
              return (
                <CarouselItem
                  key={bank.id}
                  className="basis-11/12 md:basis-11/12 pl-4 py-1"
                >
                  <ApprovedBankCard bank={bank} isSelected={isActive} />
                </CarouselItem>
              );
            })}

            {offers.clt.failedBanks?.map((bank, index) => (
              <CarouselItem
                key={`failed-bank-${index}`}
                className="basis-11/12 md:basis-11/12 pl-4 py-1"
              >
                <RejectedBankCard bank={bank} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {(offers.clt.approvedBanks?.length || 0) +
            (offers.clt.failedBanks?.length || 0) >
            1 && (
            <div className="flex justify-center mt-3 gap-2 pb-2">
              <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 rounded-full px-3 py-1">
                <CarouselPrevious className="static translate-y-0 h-7 w-7 border-none bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-none" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Navegar entre bancos
                </span>
                <CarouselNext className="static translate-y-0 h-7 w-7 border-none bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-none" />
              </div>
            </div>
          )}
        </Carousel>
      ) : null}
    </div>
  );
}
