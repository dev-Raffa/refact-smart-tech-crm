import type { LeadDTO } from '../types/lead.dto';
import type { Lead, LeadProduct, LeadStage, GetLeadsParams } from '../types/lead.model';

export class LeadMapper {
  public static toModel(dto: LeadDTO): Lead {
    return {
      id: dto.id,
      date: dto.date,
      availableBalance: dto.availableBalance,
      stageName: dto.stageName as LeadStage,
      approvedBank: dto.approvedBank,
      finalizationReason: dto.finalizationReason,
      products: dto.products as LeadProduct[],
      customer: {
        name: dto.customer.name,
        cpf: dto.customer.cpf,
        marketingDetails: dto.customer.marketingDetails ?? undefined,
      },
      operator: dto.operator
        ? {
          id: dto.operator.id,
          name: dto.operator.name,
          username: dto.operator.username,
          teamDetails: dto.operator.teamDetails ?? undefined,
        }
        : undefined,
      lastFlow: dto.lastFlow
        ? {
          bank: dto.lastFlow.bank,
          flowName: dto.lastFlow.flowName,
          cadence: dto.lastFlow.cadence,
          status: dto.lastFlow.status,
          needsHumanHelp: dto.lastFlow.needsHumanHelp,
          user: dto.lastFlow.user ?? '',
          receivingAssistance: dto.lastFlow.receivingAssistance,
          executedAt: dto.lastFlow.executedAt,
          attempt: dto.lastFlow.attempt,
        }
        : undefined,
      publicServantDetails: dto.publicServantDetails
        ? {
          governmentLevel: dto.publicServantDetails.governmentLevel ?? undefined,
          cityHall: dto.publicServantDetails.cityHall ?? undefined,
          state: dto.publicServantDetails.state ?? undefined,
        }
        : undefined,
    };
  }

  public static toModelList(dtos: LeadDTO[]): Lead[] {
    return dtos.map(LeadMapper.toModel);
  }

  public static toQueryParams(params: GetLeadsParams): Record<string, unknown> {
    const query: Record<string, unknown> = {
      'pageFilter.page': params.page,
      'pageFilter.pageSize': params.pageSize,
    };

    if (params.stages && params.stages.length > 0) {
      query.stages = params.stages.join(',');
    }

    if (params.products) query.products = params.products;
    if (params.operatorIds) query.operatorIds = params.operatorIds;
    if (params.source) query.source = params.source;
    if (params.audience) query.audience = params.audience;

    if (params.withConversationStatus && params.withConversationStatus !== 'All') {
      query.withConversationStatus = params.withConversationStatus;
    }

    const hasSpecificFilter =
      params.withCadence ||
      params.includeFinalized ||
      params.includeNeedAssistence ||
      params.includeDataprevFailed ||
      params.includePendingSignature ||
      params.includeProposalPendingAcceptance ||
      params.includePendingPayment ||
      params.includePaid ||
      params.includeSigned ||
      params.includeMissingSignature ||
      params.includeInNegotiation ||
      params.manuallyDesqualification ||
      params.automaticallyDesqualification ||
      params.withReceivingAssistance ||
      params.withCpfInAuthorizationQueue;

    if (params.lastFlowName && !hasSpecificFilter) {
      query.lastFlowName = params.lastFlowName;
      if (params.lastFlowExecutionStatus) {
        query.lastFlowExecutionStatus = params.lastFlowExecutionStatus;
      }
    }

    if (params.withCadence) query.withLastFlowStepExecutedOnCadence = true;
    if (params.includeFinalized) query.withLastFlowStepConversationEnded = true;
    if (params.includeNeedAssistence) query.withLastFlowStepExecutedNeedHumanHelp = true;

    if (params.includeDataprevFailed) {
      query.lastFlowName = 'GeneratingDataPrevLink';
      query.lastFlowExecutionStatus = 'RunFailed';
    }

    if (params.includePendingSignature) {
      query.lastFlowName = 'ConfirmingDataPrevAuthorization';
      query.lastFlowExecutionStatus = 'RunningNow';
    }

    if (params.includeMissingSignature) {
      query.lastFlowName = 'TryingGeneratingFormalizationLinkManually';
      query.lastFlowExecutionStatus = 'RunningNow';
    }

    if (params.includeSigned) {
      query.lastFlowName = 'TryingGeneratingFormalizationLinkManually';
      query.lastFlowExecutionStatus = 'RunSuccessfully';
    }

    if (params.manuallyDesqualification) {
      query.lastFlowName = 'ManuallyDesqualification';
    }

    if (params.automaticallyDesqualification) {
      query.lastFlowName = 'AutomaticallyDesqualification';
    }

    if (params.includeProposalPendingAcceptance) {
      query.lastFlowName = 'ShowingAvailableSimulationLoanValues';
      query.lastFlowExecutionStatus = 'RunningNow';
    }

    if (params.includePendingPayment) {
      query.lastFlowName = 'ConfirmingPaymentReceived';
      query.lastFlowExecutionStatus = 'RunningNow';
    }

    if (params.includePaid) {
      query.lastFlowName = 'ConfirmingPaymentReceived';
      query.lastFlowExecutionStatus = 'RunSuccessfully';
    }

    if (params.includeInNegotiation) {
      query.lastFlowName = 'ShowingAvailableSimulationLoanValues';
      query.lastFlowExecutionStatus = 'RunSuccessfully';
    }

    if (params.cpf) query.cpf = params.cpf;
    if (params.phoneNumber) query.phoneNumber = params.phoneNumber;
    if (params.name) query.name = params.name;
    if (params.proposalNumber) query.proposalNumber = params.proposalNumber;

    if (params.withReceivingAssistance) query.withLastFlowStepExecutedReceivingAssistance = true;
    if (params.withCpfInAuthorizationQueue) query.withLastFlowStepExecutedCpfInAuthorizationQueue = true;

    if (params.dateIni) query.dateIni = params.dateIni;
    if (params.dateEnd) query.dateEnd = params.dateEnd;

    return query;
  }


}
