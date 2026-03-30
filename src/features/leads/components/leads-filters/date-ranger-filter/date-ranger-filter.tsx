import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { cn } from '@/shared/utils';

import { useDateRangeFilter } from './use-date-range-filter';

export function LeadsDateRangeFilter() {
  const { preset, dateRange, handleSelectChange, handleCustomDateChange } =
    useDateRangeFilter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formatDateRange = () => {
    if (!dateRange?.from) return 'Selecionar período';

    const fromFormatted = format(dateRange.from, 'dd/MM/yyyy', {
      locale: ptBR
    });

    if (!dateRange.to) return fromFormatted;

    const toFormatted = format(dateRange.to, 'dd/MM/yyyy', {
      locale: ptBR
    });

    return `${fromFormatted} - ${toFormatted}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={preset} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Hoje</SelectItem>
          <SelectItem value="7">Últimos 7 dias</SelectItem>
          <SelectItem value="30">Últimos 30 dias</SelectItem>
          <SelectItem value="60">Últimos 60 dias</SelectItem>
          <SelectItem value="90">Últimos 90 dias</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      {preset === 'custom' && (
        <div className="relative">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[240px] h-9 justify-start text-left font-normal',
                  !dateRange?.from && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange()}
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
        </div>
      )}
    </div>
  );
}
