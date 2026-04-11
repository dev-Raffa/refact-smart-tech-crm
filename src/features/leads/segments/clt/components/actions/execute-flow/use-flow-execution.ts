import { useCallback, useState } from 'react';

import { useAuthStore } from '@/shared/store';

import type {
  AvailableFlow,
  FlowExecutionResult,
  FlowFormState,
  FlowVariables
} from '@/features/leads/types/flow.types';
import {
  FLOW_IDS,
  FLOW_STAGE_MAPPING
} from '@/features/leads/types/flow.types';
import {
  useLeadDetailsQuery,
  useLeadFlowsQuery
} from '@/features/leads/hooks/use-queries';
import { useExecuteFlowMutation } from '@/features/leads/hooks/use-mutations';
import type { CltLead } from '../../../types/models';

export function useFlowExecution(lead: CltLead) {
  const { data: allFlows, isLoading: isLoadingFlows = true } =
    useLeadFlowsQuery();
  const { mutateAsync: executeFlow } = useExecuteFlowMutation();
  const [flows, setFlows] = useState<AvailableFlow[]>([]);
  const [executing, setExecuting] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<Map<string, FlowExecutionResult>>(
    new Map()
  );
  const [formState, setFormState] = useState<Record<string, FlowFormState>>({});

  const user = useAuthStore((state) => state.user);

  const { data: leadDetails } = useLeadDetailsQuery(lead.id);

  const loadFlows = useCallback(async () => {
    if (!allFlows) return;

    const currentStage = FLOW_STAGE_MAPPING[lead.stageName] ?? 'None';

    const filtered = allFlows.filter(
      (f) => f.product === 'Clt' && f.allowedStages?.includes(currentStage)
    );

    setFlows(filtered);
  }, [lead.stageName, allFlows]);

  const setFlowExecuting = useCallback((id: string, value: boolean) => {
    setExecuting((prev) => {
      const next = new Set(prev);

      if (value) next.add(id);
      else next.delete(id);

      return next;
    });
  }, []);

  const handleExecute = useCallback(
    async (flow: AvailableFlow) => {
      setFlowExecuting(flow.id, true);

      const state = formState[flow.id] ?? {};

      if (
        flow.flowId === FLOW_IDS.FINALIZATION ||
        flow.flowId === FLOW_IDS.DISQUALIFICATION
      ) {
        if (!state.reason) {
          throw new Error('Selecione o motivo antes de executar.');
        }
      }

      if (flow.flowId === FLOW_IDS.STAGE_CHANGE && !state.stage) {
        throw new Error('Selecione a coluna de destino.');
      }

      if (flow.flowId === FLOW_IDS.CPF_CONSULTATION && !state.cpf) {
        throw new Error('Informe o CPF para consulta.');
      }

      if (
        flow.flowId === FLOW_IDS.FORMALIZATION_LINK &&
        !state.formalizationUrl
      ) {
        throw new Error('Informe o link de formalização.');
      }

      const variables: FlowVariables = {
        SimulationId: lead.id,
        userId: user?.id ?? 'unknown',
        username: user?.name ?? 'unknown',
        Reason: state.reason,
        StageName: state.stage,
        cpf: state.cpf,
        formalization_url: state.formalizationUrl
      };

      const result = await executeFlow({
        flow,
        leadId: lead.id,
        contactId: leadDetails?.chat?.contactId,
        channelId: leadDetails?.chat?.channelId,
        variables
      });

      if (result) {
        setResults((prev) => new Map(prev).set(flow.id, result));
      }

      setFlowExecuting(flow.id, false);
    },
    [formState, lead, user, setFlowExecuting, executeFlow, leadDetails]
  );

  const updateForm = useCallback(
    (flowId: string, data: Partial<FlowFormState>) => {
      setFormState((prev) => ({
        ...prev,
        [flowId]: { ...prev[flowId], ...data }
      }));
    },
    []
  );

  return {
    flows,
    loading: isLoadingFlows,
    executing,
    results,
    formState,
    handleExecute,
    updateForm,
    loadFlows
  };
}
