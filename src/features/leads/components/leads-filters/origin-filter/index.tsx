import { Check, PlusCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/shared/components/ui/command';
import { cn } from '@/shared/utils';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';

export function LeadsOriginFilter() {
  const { state, dispatch } = useLeadsBoardContext();
  const selectedSources = state.source;
  const sourceOptions = state.filterOptions.sources;

  const onSelectedSourcesChange = (sources: string[]) => {
    dispatch({ type: 'SET_SOURCES', payload: sources });
  };
  const toggleSource = (value: string) => {
    const newList = selectedSources.includes(value)
      ? selectedSources.filter((item) => item !== value)
      : [...selectedSources, value];
    onSelectedSourcesChange(newList);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-dashed min-w-[160px] justify-start"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Origem
          {selectedSources.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 rounded-sm px-1 font-normal"
            >
              {selectedSources.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filtrar origens..." />
          <CommandList>
            <CommandEmpty>Nenhuma origem encontrada.</CommandEmpty>
            <CommandGroup>
              {sourceOptions.map((option) => {
                const isSelected = selectedSources.includes(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => toggleSource(option)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className={cn('h-4 w-4')} />
                    </div>
                    <span>{option}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedSources.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onSelectedSourcesChange([])}
                    className="justify-center cursor-pointer"
                  >
                    Limpar origens
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
