import { handleLeadError } from '@/features/leads/services/error-handler';
import { httpClient } from '@/infra/api/gateway-api';
import type { CreateCltLead } from '../types/models';
import type { SetApprovedBankParams } from '../types/dtos';

export class CltLeadService {
  public static async createLead(data: CreateCltLead): Promise<void> {
    try {
      await httpClient.post('/simulations/add-manually-payment', data);
    } catch (error) {
      handleLeadError(error, 'createCltLead');
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
}
