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
      <div className="text-[10px] text-zinc-400 pt-1 font-medium tracking-wide uppercase">
        Marketing:
      </div>
      <MarketingBadges marketing={lead.marketing} />
    </>
  );
}
