
export const LeadCommonSteps = {
  None: 0,
  ConversationStarted: 'Conversa iniciada',
  ValidatingCpf: 'Validando CPF',
  DeterminingBankSimulation: 'Determinando simulação bancária',
  AttemptingToFormalizeSimulation: 'Tentando formalizar simulação',
  ValidatingNewPixProvided: 'Validando novo Pix fornecido',
  FormalizingSimulation: 'Formalizando simulação',
  InsertingCustomer: 'Inserindo cliente',
  SimulationCanceled: 'Simulação cancelada',
  EnrichCustomerPesonalDataViaNovaVidaApi:
    'Enriquecendo dados pessoais do cliente via NovaVidaApi',
  WaitingForFormalizationCustomerSignContract:
    'Aguardando formalização do cliente assinar contrato',
  ConversationEnded: 'Conversa encerrada',
  StartingCustomerAttendance: 'Iniciando atendimento ao cliente',
  AutomaticallyDesqualification: 'Desqualificação automática',
  ManuallyDesqualification: 'Desqualificação manual'
} as const;

export const LeadPublicServantSteps = {
  ...LeadCommonSteps,
  SendingPublicServantInformation: 'Enviando informações de servidor público',
  SendingPayslip: 'Enviando contra-cheque',
  AskingAgency: 'Perguntando agência',
  AskingState: 'Perguntando estado',
  AskingCityHall: 'Perguntando prefeitura'
};

export const LeadCltSteps = {
  ...LeadCommonSteps,
  ShowingAvailableSimulationLoanValues:
    'Exibindo valores de empréstimo de simulação disponíveis',
  ShowingCasOffer: 'Exibindo oferta de CAS',
  EnrichCustomerWorkerDataViaDataPrevApi:
    'Enriquecendo dados do trabalhador via DataPrev API',
  GeneratingDataPrevLink: 'Gerando link DataPrev',
  ConfirmingDataPrevAuthorization: 'Confirmando autorização DataPrev',
  TryingGeneratingFormalizationLinkAutomatically:
    'Tentando gerar link de formalização automaticamente',
  TryingGeneratingFormalizationLinkManually:
    'Tentando gerar link de formalização manualmente',
  ConfirmingFormalizationLinkSignature:
    'Confirmando assinatura do link de formalização',
  ConfirmingPaymentReceived: 'Confirmando pagamento recebido',
  ConfirmingCasOfferPayment: 'Confirmando pagamento da oferta CAS',
  ConfirmingPixOfferPayment: 'Confirmando pagamento da oferta Pix',
  ConfirmingFgtsOfferPayment: 'Confirmando pagamento da oferta FGTS',
  ConfirmingCrefazOfferPayment: 'Confirmando pagamento da oferta Crefaz'
};
