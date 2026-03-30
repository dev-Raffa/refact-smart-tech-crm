import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/shared/utils/debounce';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';

export type LeadsTextFilterType =
  | 'name'
  | 'cpf'
  | 'phoneNumber'
  | 'proposalNumber';

export function useTextFilter() {
  const { state, dispatch } = useLeadsBoardContext();
  const { name, cpf, phoneNumber, proposalNumber } = state;

  const initialType: LeadsTextFilterType = proposalNumber
    ? 'proposalNumber'
    : cpf
      ? 'cpf'
      : phoneNumber
        ? 'phoneNumber'
        : 'name';

  const initialValue = state[initialType] ?? '';

  const [filterType, setFilterType] =
    useState<LeadsTextFilterType>(initialType);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const debouncedFilterChange = useMemo(
    () =>
      debounce((type: LeadsTextFilterType, value: string | null) => {
        dispatch({ type: 'SET_TEXT_FILTER', payload: { type, value } });
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    const normalizedValue = inputValue.trim() === '' ? null : inputValue.trim();
    if (normalizedValue !== (state[filterType] ?? null)) {
      debouncedFilterChange(filterType, normalizedValue);
    }
  }, [inputValue, filterType, debouncedFilterChange, state]);

  useEffect(() => {
    if (!name && !cpf && !phoneNumber && !proposalNumber) {
      setInputValue('');
    }
  }, [name, cpf, phoneNumber, proposalNumber]);

  const handleTypeChange = (newType: LeadsTextFilterType) => {
    setFilterType(newType);
    setInputValue('');
    dispatch({
      type: 'SET_TEXT_FILTER',
      payload: { type: newType, value: null }
    });
  };

  return {
    filterType,
    inputValue,
    handleTypeChange,
    setInputValue
  };
}
