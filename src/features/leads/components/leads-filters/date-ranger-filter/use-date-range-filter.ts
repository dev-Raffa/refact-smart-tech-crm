import { useState, useEffect } from 'react';
import { format, subDays, differenceInDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';

export function useDateRangeFilter() {
  const { state, dispatch } = useLeadsBoardContext();
  const { dateIni: startDate, dateEnd: endDate } = state;

  const getPresetFromDates = (start: string | null, end: string | null) => {
    if (!start && !end) return '0';

    if (start && end) {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      if (end.startsWith(todayStr)) {
        const diff = differenceInDays(new Date(end), new Date(start));
        if (diff === 0) return '0';
        if (diff === 6) return '7';
        if (diff === 29) return '30';
        if (diff === 59) return '60';
        if (diff === 89) return '90';
      }
    }
    return 'custom';
  };

  const [preset, setPreset] = useState<string>(
    getPresetFromDates(startDate, endDate)
  );

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (startDate && endDate) {
      return {
        from: new Date(startDate),
        to: new Date(endDate)
      };
    }
    return undefined;
  });

  useEffect(() => {
    setPreset(getPresetFromDates(startDate, endDate));
    if (startDate && endDate) {
      setDateRange({
        from: new Date(startDate),
        to: new Date(endDate)
      });
    } else {
      setDateRange(undefined);
    }
  }, [startDate, endDate]);

  const onFilterChange = (start: string | null, end: string | null) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: { start, end } });
  };

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

    if (value === '0') applyPreset(0);
    else if (value === '7') applyPreset(6);
    else if (value === '30') applyPreset(29);
    else if (value === '60') applyPreset(59);
    else if (value === '90') applyPreset(89);
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

  return {
    preset,
    dateRange,
    handleSelectChange,
    handleCustomDateChange
  };
}
