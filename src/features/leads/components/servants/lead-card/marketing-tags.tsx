import type { Lead } from '../../../types/lead.model';
import { MarketingBadges } from '../../marketing-badges';

type PublicServantsMarketingTagsProps = {
  lead: Lead;
};

export function PublicServantsMarketingTags({
  lead
}: PublicServantsMarketingTagsProps) {
  return (
    <>
      <MarketingBadges marketing={lead.marketing} />
    </>
  );
}
