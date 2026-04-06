import {
  CheckCircle2,
  XCircle,
  Wallet,
  ChevronRight,
  CalendarDays,
  Banknote,
  Percent,
  InfoIcon,
  ArrowRightLeft,
  FileEdit,
  PlusCircle
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/shared/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/shared/components/ui/carousel';
import { Button } from '@/shared/components/ui/button';
import type {
  ProductOfferInformation,
  OfferInformation
} from '../../../../types/lead.model';
import { formatCurrencyBRL } from '@/shared/utils';
import { CopyButton } from '@/shared/components/global/copy-button';
import { cn } from '@/shared/utils';

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
      {/* CLT / Approved & Failed Banks Carousel */}
      {offers.clt &&
      (offers.clt.approvedBanks?.length || offers.clt.failedBanks?.length) ? (
        <Carousel className="w-full px-1">
          <CarouselContent>
            {/* Approved Banks */}
            {offers.clt.approvedBanks?.map((bank, index) => {
              const isActive = index === 0;
              return (
                <CarouselItem
                  key={bank.id}
                  className="basis-11/12 md:basis-11/12 pl-4 py-1"
                >
                  <Card
                    className={cn(
                      'h-full flex flex-col justify-between transition-all duration-300 rounded-md shadow-none',
                      'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'
                    )}
                  >
                    <CardHeader className="pb-3 pt-4 px-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Banco
                          </span>
                          <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-none">
                            {bank.name}
                          </CardTitle>
                        </div>
                        {isActive && (
                          <Badge className="bg-green-600 hover:bg-green-700 text-white border-none px-2 py-0.5 h-6 text-[10px] font-semibold shadow-none">
                            <CheckCircle2 className="size-3 mr-1.5" />
                            Selecionado
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 pb-2 flex-grow">
                      <div className="space-y-4">
                        <div className="flex flex-col gap-1 p-3 bg-white/60 dark:bg-black/20 rounded-md border border-zinc-100 dark:border-zinc-800/50">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Wallet className="size-3.5" />
                            <span className="text-[10px] font-semibold uppercase tracking-wide">
                              Valor Liberado
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-tight">
                            {formatCurrencyBRL(bank.releasedAmount)}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <StatBox
                            label="Prazo"
                            value={`${bank.installmentTerm}x`}
                            icon={<CalendarDays className="size-3" />}
                          />
                          <StatBox
                            label="Parcela"
                            value={formatCurrencyBRL(bank.installmentAmount)}
                            icon={<Banknote className="size-3" />}
                          />
                          <StatBox
                            label="Taxa"
                            value={`${bank.interestRate?.toFixed(2)}%`}
                            icon={<Percent className="size-3" />}
                          />
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-4 pb-4 pt-3 flex flex-col gap-2">
                      {isActive ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary h-9 font-medium"
                        >
                          <FileEdit className="size-4" />
                          Editar Proposta
                        </Button>
                      ) : (
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 gap-1.5 text-xs h-9 font-medium shadow-sm bg-red-700 hover:bg-red-800 text-white border-none"
                          >
                            <ArrowRightLeft className="size-3.5" />
                            Selecionar Banco
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            title="Editar Simulação"
                          >
                            <FileEdit className="size-4 text-muted-foreground" />
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}

            {/* Failed Banks */}
            {offers.clt.failedBanks?.map((bank, index) => (
              <CarouselItem
                key={`failed-bank-${index}`}
                className="basis-11/12 md:basis-11/12 pl-4 py-1"
              >
                <Card
                  className={cn(
                    'h-full flex flex-col justify-between transition-all duration-300 rounded-md shadow-none',
                    'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'
                  )}
                >
                  <CardHeader className="pb-3 pt-4 px-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          Banco
                        </span>
                        <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-none">
                          {bank.bankFailed}
                        </CardTitle>
                      </div>
                      <Badge className="bg-red-600 hover:bg-red-700 text-white border-none px-2 py-0.5 h-6 text-[10px] font-semibold shadow-none">
                        <XCircle className="size-3 mr-1.5" />
                        Reprovado
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 pb-2 flex-grow">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1 p-3 bg-white/60 dark:bg-black/20 rounded-md border border-zinc-100 dark:border-zinc-800/50">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <InfoIcon className="size-3.5" />
                          <span className="text-[10px] font-semibold uppercase tracking-wide">
                            Motivos:
                          </span>
                        </div>
                        {bank.reasons.map((reason, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 py-1 text-red-700 dark:text-zinc-300 text-sm"
                          >
                            <ChevronRight className="size-4 shrink-0" />
                            <span className="underline leading-tight">
                              {reason}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-4 pb-4 pt-3 flex flex-col gap-2">
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 gap-1.5 text-xs h-9 font-medium shadow-sm"
                        disabled
                      >
                        <ArrowRightLeft className="size-3.5" />
                        Selecionar Banco
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
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

      {/* Legacy Other Products (FGTS, PIX, CREFAZ) */}
      {/* (Skipping detailed mirror for these unless specifically requested, CLT is primary context) */}
      {/* But I'll make them closer anyway */}

      {offers.fgts && (
        <SimpleLegacyCard title="Antecipação FGTS" offer={offers.fgts} />
      )}
      {offers.pix && (
        <SimpleLegacyCard title="Cartão no PIX" offer={offers.pix} />
      )}
      {offers.cas && (
        <SimpleLegacyCard
          title="Proteção Smart (CAS)"
          offer={offers.cas}
          isCas
        />
      )}
      {offers.crefaz && (
        <SimpleLegacyCard title="Empréstimo CREFAZ" offer={offers.crefaz} />
      )}
    </div>
  );
}

function StatBox({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded bg-zinc-50 dark:bg-zinc-800/50 border border-transparent shadow-none">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[9px] font-medium uppercase">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
        {value}
      </span>
    </div>
  );
}

function SimpleLegacyCard({
  title,
  offer,
  isCas = false
}: {
  title: string;
  offer: OfferInformation;
  isCas?: boolean;
}) {
  return (
    <Card className="rounded-md border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-none mx-1">
      <CardHeader className="pb-3 pt-4 px-4 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Produto
          </span>
          <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-none">
            {title}
          </CardTitle>
        </div>
        {offer.paid && (
          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none px-2 py-0.5 h-6 text-[10px] font-semibold shadow-none">
            <CheckCircle2 className="size-3 mr-1.5" /> PAGO
          </Badge>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-1 p-3 bg-white/60 dark:bg-black/20 rounded-md border border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Wallet className="size-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">
                {isCas ? 'Valor Assinatura' : 'Valor Liberado'}
              </span>
            </div>
            <span className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-tight">
              {formatCurrencyBRL(
                isCas ? offer.signatureAmount || 0 : offer.releasedAmount || 0
              )}
            </span>
          </div>

          {!isCas && (
            <div className="grid grid-cols-3 gap-2">
              <StatBox
                label="Prazo"
                value={`${offer.installmentTerm}x`}
                icon={<CalendarDays className="size-3" />}
              />
              <StatBox
                label="Parcela"
                value={formatCurrencyBRL(offer.installmentAmount || 0)}
                icon={<Banknote className="size-3" />}
              />
              <StatBox
                label="Taxa"
                value={`${offer.interestRate?.toFixed(2)}%`}
                icon={<Percent className="size-3" />}
              />
            </div>
          )}

          {offer.proposalNumber && (
            <div className="flex items-center justify-between p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100/50 dark:border-zinc-800/30">
              <div className="flex items-center gap-1.5">
                <div className="text-[9px] font-bold text-muted-foreground uppercase">
                  Proposta
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                  {offer.proposalNumber}
                </span>
              </div>
              <CopyButton
                copy={offer.proposalNumber}
                successText="Copiado!"
                errorText="Erro"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 border-zinc-200 dark:border-zinc-800 h-9 font-medium"
        >
          <FileEdit className="size-4" />
          Editar Proposta
        </Button>
      </CardFooter>
    </Card>
  );
}
