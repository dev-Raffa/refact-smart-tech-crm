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
