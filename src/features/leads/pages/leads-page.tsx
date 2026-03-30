import { PageHeader } from '@/shared/components/global/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/components/ui/tabs';
import { PublicServantLeadBoard } from '../components/servants/lead-board';

export const LeadsPage = () => {
  return (
    <>
      <PageHeader title="Leads" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="flex flex-col gap-2 pb-6">
          <h2 className="text-2xl font-semibold">Gerenciar leads</h2>
          <p className="text-muted-foreground">
            Acompanhe suas simulações e negociações de forma integrada.
          </p>
        </div>

        <Tabs defaultValue="inss" className="w-full">
          <TabsList className="p-1 mb-2">
            <TabsTrigger value="inss" className="px-6">
              Servidores
            </TabsTrigger>
            <TabsTrigger value="clt" className="px-6">
              CLT
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="inss"
            className="mt-6 border-none p-0 outline-none flex-1 flex flex-col min-h-0"
          >
            <PublicServantLeadBoard />
          </TabsContent>

          <TabsContent
            value="clt"
            className="mt-6 border-none p-0 outline-none"
          >
            <div className="rounded-xl border border-dashed border-zinc-200 p-24 text-center text-muted-foreground">
              Board CLT em desenvolvimento...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
