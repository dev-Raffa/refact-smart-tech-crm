interface MarketingBadgesProps {
  marketing: {
    audience: string;
    source: string;
  };
}

export const MarketingBadges = ({ marketing }: MarketingBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-1 w-full">
      <span className="inline-flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] font-semibold px-1.5 py-0.5 rounded">
        {marketing.source}
      </span>
      <span className="inline-flex items-center bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 text-[10px] font-semibold px-1.5 py-0.5 rounded">
        {marketing.audience}
      </span>
    </div>
  );
};
