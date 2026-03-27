import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

type FilterType = 'name' | 'cpf' | 'phone';

interface TextSearchFilterProps {
  filters: {
    name: string | null;
    cpf: string | null;
    phone: string | null;
  };
  onFilterChange: (type: FilterType, value: string | null) => void;
}

export function TextSearchFilter({ filters, onFilterChange }: TextSearchFilterProps) {
  const initialType: FilterType = filters.cpf ? 'cpf' : filters.phone ? 'phone' : 'name';
  const initialValue = filters[initialType] ?? '';

  const [filterType, setFilterType] = useState<FilterType>(initialType);
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  // Native debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const normalizedValue = debouncedValue.trim() === '' ? null : debouncedValue.trim();
    onFilterChange(filterType, normalizedValue);
  }, [debouncedValue, filterType, onFilterChange]);

  useEffect(() => {
    if (!filters.name && !filters.cpf && !filters.phone) {
      setInputValue('');
    }
  }, [filters.name, filters.cpf, filters.phone]);

  const handleTypeChange = (newType: FilterType) => {
    setFilterType(newType);
    setInputValue('');
    onFilterChange(newType, null);
  };

  return (
    <div className="flex items-center w-full max-w-sm">
      <Select value={filterType} onValueChange={(value) => handleTypeChange(value as FilterType)}>
        <SelectTrigger className="w-[120px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-muted/20">
          <SelectValue placeholder="Filtrar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Nome</SelectItem>
          <SelectItem value="cpf">CPF</SelectItem>
          <SelectItem value="phone">Telefone</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="relative flex-1">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={`Buscar por ${
            filterType === 'name' ? 'nome' : filterType === 'cpf' ? 'CPF' : 'telefone'
          }...`}
          className="rounded-l-none pl-9 focus-visible:ring-1 focus-visible:ring-offset-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
