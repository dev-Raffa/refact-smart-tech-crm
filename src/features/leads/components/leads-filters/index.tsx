import { LeadsAudienceFilter } from './audience-filter';
import { LeadsDateRangeFilter } from './date-ranger-filter/date-ranger-filter';
import { LeadsIsActiveFilter } from './is-active-filter';
import { LeadsOperatorsFilter } from './operators-filter';
import { LeadsOriginFilter } from './origin-filter';
import { LeadsTextFilter } from './text-filter';

export const LeadsFilters = () => {
  return (
    <div className="flex w-full items-start gap-2">
      <LeadsTextFilter />
      <LeadsDateRangeFilter />
      <LeadsOperatorsFilter />
      <LeadsOriginFilter />
      <LeadsAudienceFilter />
      <LeadsIsActiveFilter />
    </div>
  );
};
