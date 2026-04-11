import type { CltLead } from '../types/models';
import type { LeadDTO } from '@/features/leads/types/lead.dto';

export class CltLeadMapper {
  public static toLead(dto: LeadDTO): CltLead {
    return {
      id: dto.id,
      date: dto.date,
      stageName: dto.stageName,
      availableBalance: dto.availableBalance,
      finalizationReason: dto.finalizationReason,
      customer: {
        name: dto.customer.name,
        cpf: dto.customer.cpf || 'Não informado'
      },
      lastFlow: {
        flowName: dto.lastFlow?.flowName || 'Não informado',
        status:
          (dto.lastFlow
            ?.status as import('@/features/leads/types/lead.model').LeadLastFlowExecutionStatus) ||
          'RunSuccessfully',
        receivingAssistance: dto.lastFlow?.receivingAssistance || false,
        cadence: dto.lastFlow?.cadence || 'Não informado',
        needsHumanHelp: dto.lastFlow?.needsHumanHelp || false
      },
      marketing: dto.customer.marketingDetails
        ? {
            source: dto.customer.marketingDetails.source,
            audience: dto.customer.marketingDetails.audience
          }
        : {
            source: 'NÃO INFORMADO',
            audience: 'NÃO INFORMADO'
          },
      operator: dto.operator || undefined,
      products: dto.products,
      approvedBank: dto.approvedBank
    };
  }
}
