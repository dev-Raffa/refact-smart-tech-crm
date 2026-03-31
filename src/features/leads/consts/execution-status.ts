export const LeadExecutionStatus = {
  RunningNow: 'RunningNow',
  RunSuccessfully: 'RunSuccessfully',
  RunFailedMarkedForRetry: 'RunFailedMarkedForRetry',
  RunFailed: 'RunFailed',
  AllAttemptsExceededRetryIn1Hour: 'AllAttemptsExceededRetryIn1Hour'
} as const;

export type TLeadExecutionStatus = keyof typeof LeadExecutionStatus;
