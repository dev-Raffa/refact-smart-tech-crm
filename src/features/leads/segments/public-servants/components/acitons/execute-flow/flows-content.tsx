import { RefreshCw } from 'lucide-react';
import { FlowCard } from './flow-card';
import { useFlowExecution } from './use-flow-execution';
import { useEffect } from 'react';
import type { PublicServantLead } from '../../../types/models';

export const FlowsContent = ({ lead }: { lead: PublicServantLead }) => {
  const {
    flows,
    loading,
    executing,
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
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-zinc-500">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <span className="text-sm font-medium">
          Carregando fluxos disponíveis...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto gap-2  px-4">
      {!loading && flows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <span className="text-sm font-medium text-center px-4">
            Nenhum fluxo disponível para o estágio atual:{' '}
            <span className="font-bold">{lead.stageName}</span>
          </span>
        </div>
      )}

      {!loading &&
        flows.map((flow) => (
          <FlowCard
            key={flow.id}
            lead={lead}
            flow={flow}
            state={formState[flow.id] ?? {}}
            isExecuting={executing.has(flow.id)}
            onExecute={handleExecute}
            onFormChange={updateForm}
          />
        ))}
    </div>
  );
};
