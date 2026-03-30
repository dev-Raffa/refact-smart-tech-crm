import { SearchIcon } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { useTextFilter, type LeadsTextFilterType } from './use-text-filter';

export function LeadsTextFilter() {
  const { filterType, inputValue, handleTypeChange, setInputValue } =
    useTextFilter();

  return (
    <div className="flex items-center w-full max-w-sm">
      <Select
        value={filterType}
        onValueChange={(value) =>
          handleTypeChange(value as LeadsTextFilterType)
        }
      >
        <SelectTrigger className="w-[140px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-muted/20">
          <SelectValue placeholder="Filtrar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Nome</SelectItem>
          <SelectItem value="cpf">CPF</SelectItem>
          <SelectItem value="phoneNumber">Telefone</SelectItem>
          <SelectItem value="proposalNumber">Nº da Proposta</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={`Buscar por ${
            filterType === 'name'
              ? 'nome'
              : filterType === 'cpf'
                ? 'CPF'
                : filterType === 'phoneNumber'
                  ? 'telefone'
                  : 'proposta'
          }...`}
          className="rounded-l-none pl-9 focus-visible:ring-1 focus-visible:ring-offset-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
