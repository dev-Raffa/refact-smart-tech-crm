import { parse, startOfDay, endOfDay } from 'date-fns';
import type {
  LeadDTO,
  LeadCustomerDTO,
  FlowStepDTO,
  PartnerInformationsDTO,
  LeadOperatorDTO,
  LeadCustomerDetailsDTO,
  LeadTagsDTO,
  BankPartnerInformationsDTO,
  GeneralOfferInformationDTO,
  ApprovedBanksDTO
} from '../types/lead.dto';
import type {
  Lead,
  LeadProduct,
  LeadStage,
  GetLeadsParams,
  LeadCustomer,
  FlowStep,
  PartnerInformations,
  LeadOperator,
  LeadDetails,
  LeadLastFlowExecutionStatus,
  LeadPublicServantFlowName,
  LeadCltFlowName,
  LeadFiltersValuesOptions,
  OfferInformation,
  ProductOfferInformation,
  LeadCltDetails
} from '../types/lead.model';
import { translateGovernamentLevel } from '../utils/translate-governamental-level';
import { normalizeServantOrigin } from '../utils/normalize-servant-origin';
import { getCustomerProneNumbers } from '../utils/get-customer-phone-number';
import type { LeadFinalizationReason } from '../consts/finalization-reasons';

export class LeadMapper {
  public static toModel(dto: LeadDTO): Lead {
    return {
      id: dto.id,
      date: dto.date,
      availableBalance: dto.availableBalance,
      stageName: dto.stageName as LeadStage,
      approvedBank: dto.approvedBank,
      finalizationReason: dto.finalizationReason as LeadFinalizationReason,
      products: dto.products as LeadProduct[],
      customer: LeadMapper.toCustomerModel(dto.customer),
      marketing: dto.customer.marketingDetails
        ? {
            source: dto.customer.marketingDetails.source,
            audience: dto.customer.marketingDetails.audience
          }
        : {
            source: 'NÃO INFORMADO',
            audience: 'NÃO INFORMADO'
          },
      operator: dto.operator
        ? {
            id: dto.operator.id,
            name: dto.operator.name,
            username: dto.operator.username,
            teamDetails: dto.operator.teamDetails ?? undefined
          }
        : undefined,
      lastFlow: dto.lastFlow
        ? {
            bank: dto.lastFlow.bank,
            flowName: dto.lastFlow.flowName as
              | LeadPublicServantFlowName
              | LeadCltFlowName,
            cadence: dto.lastFlow.cadence,
            status: dto.lastFlow.status as LeadLastFlowExecutionStatus,
            needsHumanHelp: dto.lastFlow.needsHumanHelp,
            user: dto.lastFlow.user ?? '',
            receivingAssistance: dto.lastFlow.receivingAssistance,
            executedAt: dto.lastFlow.executedAt,
            attempt: dto.lastFlow.attempt,
            technicalResponseDetails:
              dto.lastFlow.technicalResponseDetails ?? undefined
          }
        : {
            bank: 'Não informado',
            flowName: 'None',
            cadence: 'none',
            status: 'RunSuccessfully' as LeadLastFlowExecutionStatus,
            needsHumanHelp: false,
            user: '',
            receivingAssistance: false,
            executedAt: new Date().toISOString(),
            attempt: 0
          },
      publicServantDetails: dto.publicServantDetails
        ? {
            governamentLevel: translateGovernamentLevel(
              dto.publicServantDetails.governmentLevel
            ),
            cityHall: normalizeServantOrigin(dto.publicServantDetails.cityHall),
            state: normalizeServantOrigin(dto.publicServantDetails.state)
          }
        : {
            governamentLevel: 'Não informado',
            cityHall: 'Não informado',
            state: 'Não informado'
          },
      cltDetails: LeadMapper.toCltDetailsModel(dto.customer.cltDetails)
    };
  }

  public static toModelList(dtos: LeadDTO[]): Lead[] {
    return dtos.map(LeadMapper.toModel);
  }

  public static toQueryParams(params: GetLeadsParams): Record<string, unknown> {
    const query: Record<string, unknown> = {
      'pageFilter.page': params.page,
      'pageFilter.pageSize': params.pageSize
    };

    if (params.stages && params.stages.length > 0) {
      query.stages = params.stages.join(',');
    }

    if (params.products) query.products = params.products;
    if (params.operatorIds) query.operatorIds = params.operatorIds;
    if (params.source) query.source = params.source;
    if (params.audience) query.audience = params.audience;

    if (
      params.withConversationStatus &&
      params.withConversationStatus !== 'All'
    ) {
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
    if (params.includeNeedAssistence)
      query.withLastFlowStepExecutedNeedHumanHelp = true;

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

    if (params.withReceivingAssistance)
      query.withLastFlowStepExecutedReceivingAssistance = true;
    if (params.withCpfInAuthorizationQueue)
      query.withLastFlowStepExecutedCpfInAuthorizationQueue = true;

    if (params.dateIni) {
      const date = parse(params.dateIni, 'yyyy-MM-dd', new Date());
      query.dateIni = startOfDay(date).toISOString();
    }

    if (params.dateEnd) {
      const date = parse(params.dateEnd, 'yyyy-MM-dd', new Date());
      query.dateEnd = endOfDay(date).toISOString();
    }

    return query;
  }

  public static toCustomerModel(dto: LeadCustomerDTO): LeadCustomer {
    return {
      name: dto.name,
      cpf: dto.cpf ?? 'Não informado',
      phoneNumbers: getCustomerProneNumbers(dto.phoneNumber1, dto.phoneNumber2),
      birthDate: dto.dateBirth,
      gender: dto.gender || 'Não informado',
      rg: dto.rg || 'Não informado',
      motherName: dto.motherName || 'Não informado',
      zipCode: dto.zipCode || 'Não informado',
      city: dto.city || 'Não informado',
      uf: dto.uf || 'Não informado',
      bank: dto.bank || 'Não informado',
      paymentDay: dto.paymentDay ?? undefined,
      creationDate: dto.creationDate
    };
  }

  public static toLeadDetailsModel(
    dto: LeadCustomerDetailsDTO,
    history: FlowStepDTO[],
    partnerInfo?: BankPartnerInformationsDTO
  ): LeadDetails {
    return {
      id: dto.customer.id,
      customer: this.toCustomerModel(dto.customer),
      publicServantDetails: dto.customer.publicServantDetails
        ? {
            governamentLevel: translateGovernamentLevel(
              dto.customer.publicServantDetails.governmentLevel
            ),
            cityHall: dto.customer.publicServantDetails.cityHall,
            state: dto.customer.publicServantDetails.state
          }
        : {
            governamentLevel: 'Não informado',
            cityHall: 'Não informado',
            state: 'Não informado'
          },
      cltDetails: LeadMapper.toCltDetailsModel(dto.customer.cltDetails),
      marketing: dto.customer.marketingDetails
        ? dto.customer.marketingDetails
        : {
            source: 'Não informado',
            audience: 'Não informado'
          },
      chat: dto.customer.huggyDetails
        ? {
            chatId: dto.customer.huggyDetails.chatId,
            contactId: dto.customer.huggyDetails.contactId,
            channelId: dto.customer.huggyDetails.channelId
          }
        : undefined,
      payslip: dto.customer.documentFileName ?? undefined,
      history: history.map(LeadMapper.toFlowStepModel),
      offers: partnerInfo ? this.toProductOfferModel(partnerInfo) : undefined,
      facta: partnerInfo?.factaUsefulInformations
        ? {
            formalizationCode:
              partnerInfo.factaUsefulInformations.factaFormalizationCode ??
              undefined,
            formalizationLink:
              partnerInfo.factaUsefulInformations.factaFormalizationLink ??
              undefined
          }
        : undefined
    };
  }

  private static toProductOfferModel(
    dto: BankPartnerInformationsDTO
  ): ProductOfferInformation {
    return {
      fgts: dto.fgtsOfferInformation
        ? this.toOfferInformationModel(dto.fgtsOfferInformation)
        : undefined,
      clt: dto.cltOfferInformation
        ? {
            approvedBanks:
              dto.cltOfferInformation.approvedBanks?.map((b) =>
                this.toApprovedBankModel(b)
              ) || [],
            failedBanks:
              dto.cltOfferInformation.failedBanks?.map((f) => ({
                bankFailed: f.bankFailed,
                reasons: f.reasons
              })) || []
          }
        : undefined,
      pix: dto.pixOfferInformation
        ? this.toOfferInformationModel(dto.pixOfferInformation)
        : undefined,
      cas: dto.casOfferInformation
        ? {
            proposalNumber: dto.casOfferInformation.proposalNumber,
            signatureAmount: dto.casOfferInformation.signatureAmount,
            paid: dto.casOfferInformation.paid
          }
        : undefined,
      crefaz: dto.crefazOfferInformation
        ? this.toOfferInformationModel(dto.crefazOfferInformation)
        : undefined
    };
  }

  private static toOfferInformationModel(
    dto: GeneralOfferInformationDTO
  ): OfferInformation {
    return {
      proposalNumber: dto.proposalNumber,
      releasedAmount: dto.releasedAmount,
      installmentAmount: dto.installmentAmount,
      interestRate: dto.interestRate,
      installmentTerm: dto.installmentTerm,
      paid: dto.paid
    };
  }

  private static toApprovedBankModel(dto: ApprovedBanksDTO): any {
    return {
      id: dto.id,
      name: dto.name,
      installmentTerm: dto.installmentTerm,
      releasedAmount: dto.releasedAmount,
      installmentAmount: dto.installmentAmount,
      interestRate: dto.interestRate,
      proposalNumber: dto.proposalNumber
    };
  }

  public static toFlowStepModel(dto: FlowStepDTO): FlowStep {
    return {
      bank: dto.bank,
      flowName: dto.flowName,
      cadence: dto.cadence,
      status: dto.status as LeadLastFlowExecutionStatus,
      needsHumanHelp: dto.needsHumanHelp,
      user: dto.user ?? undefined,
      receivingAssistance: dto.receivingAssistance,
      executedAt: dto.executedAt,
      attempt: dto.attempt,
      technicalResponseDetails: dto.technicalResponseDetails ?? undefined
    };
  }

  public static toFlowStepModelList(dtos: FlowStepDTO[]): FlowStep[] {
    return dtos.map(LeadMapper.toFlowStepModel);
  }

  public static toPartnerInformationsModel(
    dto: PartnerInformationsDTO
  ): PartnerInformations {
    return {
      bankName: dto.bankName,
      status: dto.status,
      updatedAt: dto.updatedAt
    };
  }

  public static toOperatorModel(dto: LeadOperatorDTO): LeadOperator {
    return {
      id: dto.id,
      name: dto.name,
      username: dto.username,
      teamDetails: dto.teamDetails ?? undefined
    };
  }

  public static toOperatorModelList(dtos: LeadOperatorDTO[]): LeadOperator[] {
    return dtos.map(LeadMapper.toOperatorModel);
  }

  public static toLeadFiltersValuesOptionsModel(
    operators: LeadOperatorDTO[],
    tags: LeadTagsDTO[]
  ): LeadFiltersValuesOptions {
    return {
      operators: operators.map(LeadMapper.toOperatorModel),
      sources: tags
        .filter((tag) => tag.category === 'Source')
        .map((tag) => tag.label),
      audiences: tags
        .filter((tag) => tag.category === 'Audience')
        .map((tag) => tag.label)
    };
  }

  private static toCltDetailsModel(dto: any): LeadCltDetails | undefined {
    if (!dto) return undefined;

    return {
      eligible: dto.eligible || false,
      employmentStartDate: dto.employmentStartDate,
      employmentDuration: dto.employmentDurationInMonths,
      marginAvailable: dto.marginAvailable,
      totalEarnings: dto.totalEarnings,
      companies:
        dto.companies?.map((company: any) => ({
          name: company.companyName || company.name,
          cnpj: company.cnpj,
          admissionDate: company.admissionDate,
          salary: company.salary,
          registration: company.registration,
          foundationDate: company.foundationDate,
          workersCount: company.numbersOfWorkers,
          cnaeCode: company.cnaeCode,
          cnaeDescription: company.cnaeDescription
        })) || []
    };
  }
}
