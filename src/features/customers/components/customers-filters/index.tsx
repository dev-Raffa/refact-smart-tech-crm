import { RefreshCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { TextSearchFilter } from './text-search-filter';
import { PeriodFilter } from './period-filter';
import { OriginFilter } from './origin-filter';

interface CustomersFiltersProps {
  filters: {
    cpf: string | null;
    name: string | null;
    phone: string | null;
    origin: string | null;
    startDate: string | null;
    endDate: string | null;
  };
  setFilters: (update: Record<string, string | null>) => void;
  actions: {
    clearFilters: () => void;
  };
}

export function CustomersFilters({ filters, setFilters, actions }: CustomersFiltersProps) {
  const handleTextFilterChange = (type: 'name' | 'cpf' | 'phone', value: string | null) => {
    setFilters({
      name: type === 'name' ? value : null,
      cpf: type === 'cpf' ? value : null,
      phone: type === 'phone' ? value : null,
      page: '1',
    });
  };

  const handleOriginChange = (origin: string | null) => {
    setFilters({ origin, page: '1' });
  };

  const handlePeriodChange = (startDate: string | null, endDate: string | null) => {
    setFilters({ startDate, endDate, page: '1' });
  };

  const hasActiveFilters = Boolean(
    filters.cpf || filters.name || filters.phone || filters.origin || filters.startDate || filters.endDate
  );

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:gap-6 sm:space-y-0 w-full">
      <TextSearchFilter
        filters={filters}
        onFilterChange={handleTextFilterChange}
      />

      <PeriodFilter
        filters={filters}
        onFilterChange={handlePeriodChange}
      />

      <OriginFilter
        origin={filters.origin}
        onFilterChange={handleOriginChange}
      />

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={actions.clearFilters}
          className="px-3 text-muted-foreground hover:text-foreground"
          title="Limpar todos os filtros"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Limpar
        </Button>
      )}
    </div>
  );
}
