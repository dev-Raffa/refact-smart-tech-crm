import { httpClient } from '@/infra/api/gateway-api';
import type { CreatePublicServantLead } from '../types/models';
import type { UploadPaySlipDto } from '../types/dtos';
import { handleLeadError } from '@/features/leads/services/error-handler';
import { PublicServantsLeadMapper } from './mapper';

export class PublicServantLeadService {
  public static async createLead(
    data: CreatePublicServantLead
  ): Promise<string> {
    try {
      const dto = PublicServantsLeadMapper.toCreateDto(data);
      const { data: leadId } = await httpClient.post<string>(
        '/simulations',
        dto
      );

      if (leadId && data.contraCheque) {
        await PublicServantLeadService.uploadPaySlip({
          leadId,
          file: data.contraCheque[0]
        });
      }

      return leadId;
    } catch (error) {
      handleLeadError(error, 'createInssLead');
    }
  }

  public static async uploadPaySlip({
    leadId,
    file
  }: UploadPaySlipDto): Promise<void> {
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
      handleLeadError(error, 'getPaySlipUrl');
    }
  }
}
