import { LeadCLtSpecificSteps } from '../segments/clt/consts/steps';
import { LeadPublicServantSpecificSteps } from '../segments/public-servants/consts/steps';
import { LeadCommonSteps } from './common-steps';

export { LeadCommonSteps };

export const LeadAllSteps = {
  ...LeadCommonSteps,
  ...LeadCLtSpecificSteps,
  ...LeadPublicServantSpecificSteps
} as const;

export type TLeadAllSteps = keyof typeof LeadAllSteps;
