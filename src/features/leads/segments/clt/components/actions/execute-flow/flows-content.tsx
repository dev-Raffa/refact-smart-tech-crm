import { useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/shared/components/ui/alert';

import { FlowCard } from './flow-card';
import { useFlowExecution } from './use-flow-execution';
import type { CltLead } from '../../../types/models';

export function FlowsContent({ lead }: { lead: CltLead }) {
  const {
    flows,
    loading,
    executing,
    results,
    formState,
    handleExecute,
    updateForm,
    loadFlows
  } = useFlowExecution(lead);

  useEffect(() => {
    loadFlows();
  }, [loadFlows]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-zinc-500">
          Carregando fluxos disponíveis...
        </p>
      </div>
    );
  }

  if (flows.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Alert variant="destructive" className="max-w-xs">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhum fluxo disponível</AlertTitle>
          <AlertDescription className="text-xs">
            Não existem fluxos mapeados para o estágio atual ({lead.stageName})
            do produto CLT.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-10">
      {flows.map((flow) => (
        <FlowCard
          key={flow.id}
          lead={lead}
          flow={flow}
          state={formState[flow.id] ?? {}}
          isExecuting={executing.has(flow.id)}
          result={results.get(flow.id)}
          onExecute={handleExecute}
          onFormChange={updateForm}
        />
      ))}
    </div>
  );
}
