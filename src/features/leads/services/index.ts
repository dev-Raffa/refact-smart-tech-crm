import { httpClient } from '@/infra/api/gateway-api';

import type { LeadDTO } from '../types/lead.dto';
import type { PaginatedResponse } from '@/shared/types/paginated-response';
import type { 
  Lead, 
  GetLeadsParams, 
  MoveLeadParams, 
  FlowStep, 
  PartnerInformations, 
  CreateInssLeadRequest,
  CreateCltLeadRequest,
  UploadLeadDocumentParams,
  SetApprovedBankParams,
  ChangeOperatorParams
} from '../types/lead.model';

import { LeadMapper } from './mapper';
import { handleLeadError } from './error-handler';

export class LeadService {
  public static async getLeads(params: GetLeadsParams): Promise<PaginatedResponse<Lead>> {
    try {
      const { data } = await httpClient.get<PaginatedResponse<LeadDTO>>('/simulations', {
        params: LeadMapper.toQueryParams(params),
      });

      return {
        ...data,
        results: LeadMapper.toModelList(data.results),
      };
    } catch (error) {
      handleLeadError(error, 'getLeads');
    }
  }

  public static async moveLead({ leadId, targetStage }: MoveLeadParams): Promise<void> {
    try {
      await httpClient.post('/simulations/common/enqueue-update-simulation-stage', {
        simulationRequest: { simulationId: leadId },
        stageName: targetStage,
      });
    } catch (error) {
      handleLeadError(error, 'moveLead');
    }
  }

  public static async getFlowSteps(leadId: string): Promise<FlowStep[]> {
    try {
      const { data } = await httpClient.get<FlowStep[]>(`/simulations/flow-steps?simulationId=${leadId}`);
      return data;

    } catch (error) {
      handleLeadError(error, 'getFlowSteps');
    }
  }

  public static async getCustomerDetails(leadId: string): Promise<any> {
    try {
      const { data } = await httpClient.get(`/simulations/${leadId}/customer`);
      return data;
    } catch (error) {
      handleLeadError(error, 'getCustomerDetails');
    }
  }

  public static async getPublicServantDetails(leadId: string): Promise<any> {
    try {
      const { data } = await httpClient.get(`/simulations/${leadId}/public-servant-details`);
      return data;
    } catch (error) {
      handleLeadError(error, 'getPublicServantDetails');
    }
  }

  public static async setReceivingAssistanceFlag(leadId: string): Promise<void> {
    try {
      await httpClient.post('/simulations/common/enqueue-set-receiving-assistance-flag', {
        simulationId: leadId,
      });
    } catch (error) {
      handleLeadError(error, 'setReceivingAssistanceFlag');
    }
  }

  public static async setApprovedBank({ leadId, data }: SetApprovedBankParams): Promise<void> {
    try {
      await httpClient.post(`/simulations/${leadId}/approved-bank`, data);
    } catch (error) {
      handleLeadError(error, 'setApprovedBank');
    }
  }

  public static async changeBankApproved({ leadId, data }: SetApprovedBankParams): Promise<void> {
    try {
      await httpClient.patch(`/simulations/${leadId}/change-approved-bank`, data);
    } catch (error) {
      handleLeadError(error, 'changeBankApproved');
    }
  }

  public static async getPartnerInformations(leadId: string): Promise<PartnerInformations> {
    try {
      const { data } = await httpClient.get<PartnerInformations>(`/simulations/${leadId}/partner-informations`);
      return data;
    } catch (error) {
      handleLeadError(error, 'getPartnerInformations');
    }
  }

  public static async deleteSimulation(leadId: string): Promise<void> {
    try {
      await httpClient.delete(`/simulations/${leadId}`);
    } catch (error) {
      handleLeadError(error, 'deleteSimulation');
    }
  }

  public static async createInssLead(data: CreateInssLeadRequest): Promise<string> {
    try {
      const { data: leadId } = await httpClient.post<string>('/simulations', data);
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

  public static async uploadLeadDocument({ leadId, file }: UploadLeadDocumentParams): Promise<void> {
    try {
      const formData = new FormData();
      const formattedId = leadId.includes('-') 
        ? leadId 
        : leadId.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

      formData.append('File', file);
      formData.append('fileName', formattedId);

      await httpClient.post('/files/import/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      handleLeadError(error, 'uploadLeadDocument');
    }
  }

  public static async changeOperator({ leadId, operator }: ChangeOperatorParams): Promise<void> {
    try {
      await httpClient.patch(`/simulations/${leadId}/change-operator`, operator, {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      });
    } catch (error) {
      handleLeadError(error, 'changeOperator');
    }
  }
}




