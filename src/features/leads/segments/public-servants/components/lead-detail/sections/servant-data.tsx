import { Building2, Landmark, MapPin } from 'lucide-react';
import type { LeadPublicServantDetails } from '../../../types/models';

export function ServantDataSection({
  servantDetails
}: {
  servantDetails: LeadPublicServantDetails;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 mt-2 space-y-3 text-sm bg-zinc-50 dark:bg-zinc-900">
      <p className="flex items-center gap-2">
        <Landmark className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-muted-foreground font-medium">Órgão:</span>
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {servantDetails.governamentLevel}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-muted-foreground font-medium">Prefeitura:</span>
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {servantDetails.cityHall}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-muted-foreground font-medium">Estado:</span>
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {servantDetails.state}
        </span>
      </p>
    </div>
  );
}
