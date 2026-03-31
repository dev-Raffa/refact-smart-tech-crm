import type { TLeadExecutionStatus } from "../consts/execution-status";
import { LeadAllSteps, type TLeadAllSteps } from "../consts/steps";

export function getStepName(step: TLeadAllSteps, status: TLeadExecutionStatus) {
  switch (step) {
    case "StartingCustomerAttendance":
      if (status === "RunningNow") {
        return "Aguardando atendimento"
      }
      return "Em atendimento"
  
    default:
      return LeadAllSteps[step]
  }
}
  