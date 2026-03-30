import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface OriginFilterProps {
  origin: string | null;
  onFilterChange: (origin: string | null) => void;
}

const ORIGIN_OPTIONS = [
  { value: 'ALL', label: 'Todas as Origens' },
  { value: 'Api', label: 'Marketing' },
  { value: 'FileImportation', label: 'Base' }
];

export function OriginFilter({ origin, onFilterChange }: OriginFilterProps) {
  const currentValue = origin ?? 'ALL';

  const handleValueChange = (value: string) => {
    onFilterChange(value === 'ALL' ? null : value);
  };

  return (
    <Tabs
      value={currentValue}
      onValueChange={handleValueChange}
      className="w-auto"
    >
      <TabsList className="grid w-full grid-flow-col justify-start h-9">
        {ORIGIN_OPTIONS.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={`px-3 ${currentValue === value ? 'text-red-700!' : ''}`}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
