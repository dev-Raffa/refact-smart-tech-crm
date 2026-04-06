import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/components/ui/tabs';
import { PublicServantLeadBoard } from '../components/servants/lead-board';
import { BriefcaseBusiness, Landmark } from 'lucide-react';
import { CLTLeadBoard } from '../components/clt/lead-board';

export const LeadsPage = () => {
  return (
    <>
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
              <Landmark className="size-3.5" strokeWidth={1.9} />
              Servidores
            </TabsTrigger>
            <TabsTrigger value="clt" className="px-6">
              <BriefcaseBusiness className="size-3.5" strokeWidth={1.9} />
              CLT
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="inss"
            forceMount
            className="mt-6 border-none p-0 outline-none flex-1 flex-col min-h-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <PublicServantLeadBoard />
          </TabsContent>

          <TabsContent
            value="clt"
            forceMount
            className="mt-6 border-none p-0 outline-none flex-1 flex-col min-h-0 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <CLTLeadBoard />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
