import { Badge } from '@/shared/components/ui/badge';

interface MarketingBadgesProps {
  marketing: {
    audience: string;
    source: string;
  };
}

export const MarketingBadges = ({ marketing }: MarketingBadgesProps) => {
  return (
    <div className="flex flex-col gap-1.5 items-end justify-start">
      <Badge className="inline-flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] rounded-sm">
        {marketing.source}
      </Badge>
      <Badge className="inline-flex items-center bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 text-[10px] rounded-sm">
        {marketing.audience}
      </Badge>
    </div>
  );
};
