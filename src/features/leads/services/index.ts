import { httpClient } from '@/infra/api/gateway-api';

import type {
  LeadDTO,
  LeadOperatorDTO,
  LeadCustomerDetailsDTO,
  getFlowStepsResponse,
  LeadTagsDTO
} from '../types/lead.dto';
import type { PaginatedResponse } from '@/shared/types/paginated-response';
import type {
  Lead,
  GetLeadsParams,
  MoveLeadParams,
  FlowStep,
  LeadOperator,
  CreateInssLeadRequest,
  CreateCltLeadRequest,
  UploadLeadDocumentParams,
  SetApprovedBankParams,
  ChangeOperatorParams,
  LeadDetails,
  LeadFiltersValuesOptions
} from '../types/lead.model';
import type { AvailableFlow, FlowExecutionResult } from '../types/flow.types';
import { FLOW_IDS } from '../types/flow.types';

import { LeadMapper } from './mapper';
import { handleLeadError } from './error-handler';

export class LeadService {
  public static async getLeads(
    params: GetLeadsParams
  ): Promise<PaginatedResponse<Lead>> {
    try {
      const { data } = await httpClient.get<PaginatedResponse<LeadDTO>>(
        '/simulations',
        {
          params: LeadMapper.toQueryParams(params)
        }
      );

      return {
        ...data,
        results: LeadMapper.toModelList(data.results)
      };
    } catch (error) {
      handleLeadError(error, 'getLeads');
    }
  }

  public static async moveLead({
    leadId,
    targetStage
  }: MoveLeadParams): Promise<void> {
    try {
      await httpClient.post(
        '/simulations/common/enqueue-update-simulation-stage',
        {
          simulationRequest: { simulationId: leadId },
          stageName: targetStage
        }
      );
    } catch (error) {
      handleLeadError(error, 'moveLead');
    }
  }

  public static async getFlowSteps(leadId: string): Promise<FlowStep[]> {
    try {
      const { data } = await httpClient.get<getFlowStepsResponse>(
        `/simulations/flow-steps?simulationId=${leadId}`
      );
      return LeadMapper.toFlowStepModelList(data.flowStepsInfo);
    } catch (error) {
      handleLeadError(error, 'getFlowSteps');
    }
  }

  public static async getLeadDetails(leadId: string): Promise<LeadDetails> {
    try {
      const { data } = await httpClient.get<LeadCustomerDetailsDTO>(
        `/simulations/${leadId}/customer`
      );

      const { data: history } = await httpClient.get<getFlowStepsResponse>(
        `/simulations/flow-steps?simulationId=${leadId}`
      );

      return LeadMapper.toLeadDetailsModel(data, history.flowStepsInfo || []);
    } catch (error) {
      handleLeadError(error, 'getCustomerDetails');
    }
  }

  public static async getLeadFiltersValuesOptions(
    product: string
  ): Promise<LeadFiltersValuesOptions> {
    try {
      const { data: tags } = await httpClient.get<LeadTagsDTO[]>(
        `/huggy/tags?Product=${product}`
      );
      const { data: operators } = await httpClient.get<LeadOperatorDTO[]>(
        '/daily-operation/based-on-role',
        {
          params: {
            Kind: product.toUpperCase() === 'INSS' ? 'PublicServant' : product
          }
        }
      );
      return LeadMapper.toLeadFiltersValuesOptionsModel(operators, tags);
    } catch (error) {
      handleLeadError(error, 'getLeadFiltersValuesOptions');
    }
  }

  public static async setReceivingAssistanceFlag(
    leadId: string
  ): Promise<void> {
    try {
      await httpClient.post(
        '/simulations/common/enqueue-set-receiving-assistance-flag',
        {
          simulationId: leadId
        }
      );
    } catch (error) {
      handleLeadError(error, 'setReceivingAssistanceFlag');
    }
  }

  public static async setApprovedBank({
    leadId,
    data
  }: SetApprovedBankParams): Promise<void> {
    try {
      await httpClient.post(`/simulations/${leadId}/approved-bank`, data);
    } catch (error) {
      handleLeadError(error, 'setApprovedBank');
    }
  }

  public static async changeBankApproved({
    leadId,
    data
  }: SetApprovedBankParams): Promise<void> {
    try {
      await httpClient.patch(
        `/simulations/${leadId}/change-approved-bank`,
        data
      );
    } catch (error) {
      handleLeadError(error, 'changeBankApproved');
    }
  }

  public static async deleteSimulation(leadId: string): Promise<void> {
    try {
      await httpClient.delete(`/simulations/${leadId}`);
    } catch (error) {
      handleLeadError(error, 'deleteSimulation');
    }
  }

  public static async createInssLead(
    data: CreateInssLeadRequest
  ): Promise<string> {
    try {
      const { data: leadId } = await httpClient.post<string>(
        '/simulations',
        data
      );
      return leadId;
    } catch (error) {
      handleLeadError(error, 'createInssLead');
    }
  }

  public static async createCltLead(data: CreateCltLeadRequest): Promise<void> {
    try {
      await httpClient.post('/simulations/add-manually-payment', data);
    } catch (error) {
      handleLeadError(error, 'createCltLead');
    }
  }

  public static async uploadLeadDocument({
    leadId,
    file
  }: UploadLeadDocumentParams): Promise<void> {
    try {
      const formData = new FormData();
      const formattedId = leadId.includes('-')
        ? leadId
        : leadId.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

      formData.append('File', file);
      formData.append('fileName', formattedId);

      await httpClient.post('/files/import/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      handleLeadError(error, 'uploadLeadDocument');
    }
  }

  public static async getPaySlipUrl(leadId: string): Promise<string> {
    try {
      const { data } = await httpClient.get<string>(
        `/documents/${encodeURIComponent(leadId)}`
      );

      return data;
    } catch (error: any) {
      console.error('Erro ao buscar contra-cheque:', error);
      throw new Error(
        error.response?.data?.message ||
          'Falha ao buscar contra-cheque do cliente.'
      );
    }
  }

  public static async changeOperator({
    leadId,
    operator
  }: ChangeOperatorParams): Promise<void> {
    try {
      await httpClient.patch(
        `/simulations/${leadId}/change-operator`,
        operator,
        {
          headers: {
            'Content-Type': 'application/json-patch+json'
          }
        }
      );
    } catch (error) {
      handleLeadError(error, 'changeOperator');
    }
  }

  public static async getOperatorsByRole(
    kind: string
  ): Promise<LeadOperator[]> {
    try {
      const { data } = await httpClient.get<LeadOperatorDTO[]>(
        '/daily-operation/based-on-role',
        {
          params: { Kind: kind }
        }
      );
      return LeadMapper.toOperatorModelList(data);
    } catch (error) {
      handleLeadError(error, 'getOperatorsByRole');
    }
  }

  public static async getAvailableFlows(): Promise<AvailableFlow[]> {
    try {
      const { data } = await httpClient.get<AvailableFlow[]>(
        '/huggy/available-flows'
      );
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      handleLeadError(error, 'getAvailableFlows');
    }
  }

  public static async executeFlow(params: {
    flow: AvailableFlow;
    leadId: string;
    contactId?: string;
    channelId?: string;
    variables: Record<string, any>;
  }): Promise<FlowExecutionResult> {
    try {
      if (!params.contactId) {
        // Local execution (Fallback or no Huggy contact)
        const isFinalization = params.flow.flowId === FLOW_IDS.FINALIZATION;
        const endpoint = isFinalization
          ? 'finalize-simulation'
          : params.flow.flowId === FLOW_IDS.STAGE_CHANGE
            ? 'common/enqueue-update-simulation-stage'
            : 'update-stage';

        const payload = isFinalization
          ? {
              simulationRequest: { simulationId: params.leadId },
              reason: params.variables.Reason
            }
          : {
              simulationRequest: { simulationId: params.leadId },
              stageName: params.variables.StageName || 'EmptyBalance'
            };

        await httpClient.post(`/simulations/${endpoint}`, payload);
        return { chatId: '', reason: 'Executado localmente' };
      }

      // Huggy execution
      const payload = {
        uuid: params.channelId,
        contactId: params.contactId,
        flowId: params.flow.flowId,
        variables: params.variables,
        whenInChat: true,
        whenWaitForChat: true,
        whenInAuto: true
      };

      const { data } = await httpClient.post<FlowExecutionResult>(
        '/huggy/execute-flow',
        payload
      );
      return data;
    } catch (error) {
      handleLeadError(error, 'executeFlow');
    }
  }
}
