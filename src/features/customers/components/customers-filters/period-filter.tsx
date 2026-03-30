import { useEffect, useState } from 'react';
import { format, subDays, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/shared/utils';

interface PeriodFilterProps {
  filters: {
    startDate: string | null;
    endDate: string | null;
  };
  onFilterChange: (startDate: string | null, endDate: string | null) => void;
}

export function PeriodFilter({ filters, onFilterChange }: PeriodFilterProps) {
  const getPresetFromDates = (start: string | null, end: string | null) => {
    if (!start && !end) return 'all';

    // Simplistic check to map back to preset
    if (start && end) {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      if (end.startsWith(todayStr)) {
        const diff = differenceInDays(new Date(end), new Date(start));
        if (diff === 0) return '0';
        if (diff === 7) return '7';
        if (diff === 15) return '15';
        if (diff === 30) return '30';
        if (diff === 60) return '60';
      }
    }
    return 'custom';
  };

  const [preset, setPreset] = useState<string>(
    getPresetFromDates(filters.startDate, filters.endDate)
  );

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (filters.startDate && filters.endDate) {
      return {
        from: new Date(filters.startDate),
        to: new Date(filters.endDate)
      };
    }
    return undefined;
  });

  // Sync state if URL changes from outside
  useEffect(() => {
    setPreset(getPresetFromDates(filters.startDate, filters.endDate));
    if (filters.startDate && filters.endDate) {
      setDateRange({
        from: new Date(filters.startDate),
        to: new Date(filters.endDate)
      });
    } else {
      setDateRange(undefined);
    }
  }, [filters.startDate, filters.endDate]);

  const applyPreset = (days: number | null) => {
    if (days === null) {
      onFilterChange(null, null);
      setDateRange(undefined);
      return;
    }

    const end = new Date();
    const start = subDays(end, days);

    const formattedStart = format(start, 'yyyy-MM-dd');
    const formattedEnd = format(end, 'yyyy-MM-dd');

    setDateRange({ from: start, to: end });
    onFilterChange(formattedStart, formattedEnd);
  };

  const handleSelectChange = (value: string) => {
    setPreset(value);

    if (value === 'all') applyPreset(null);
    else if (value === '0') applyPreset(0);
    else if (value === '7') applyPreset(7);
    else if (value === '15') applyPreset(15);
    else if (value === '30') applyPreset(30);
    else if (value === '60') applyPreset(60);
    // if 'custom', we just wait for the user to use the DatePicker
  };

  const handleCustomDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onFilterChange(
        format(range.from, 'yyyy-MM-dd'),
        format(range.to, 'yyyy-MM-dd')
      );
    } else if (!range) {
      onFilterChange(null, null);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={preset} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px] bg-muted/20">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todo o período</SelectItem>
          <SelectItem value="0">Hoje</SelectItem>
          <SelectItem value="7">Últimos 7 dias</SelectItem>
          <SelectItem value="15">Últimos 15 dias</SelectItem>
          <SelectItem value="30">Últimos 30 dias</SelectItem>
          <SelectItem value="60">Últimos 60 dias</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      {preset === 'custom' && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'justify-start text-left font-normal w-[260px]',
                !dateRange && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'dd/MM/yyyy')} -{' '}
                    {format(dateRange.to, 'dd/MM/yyyy')}
                  </>
                ) : (
                  format(dateRange.from, 'dd/MM/yyyy')
                )
              ) : (
                <span>Selecione a data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleCustomDateChange}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
