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
import { Skeleton } from '@/shared/components/ui/skeleton';

export function LeadsAudienceFilter() {
  const { state, dispatch } = useLeadsBoardContext();
  const { isFilterOptionsLoading: isLoading, filterOptions } = state;
  const audiences = isLoading
    ? []
    : ['NÃO MAPEADO', ...filterOptions.audiences];

  const selectedAudiences = state.audience;

  const onSelectedAudiencesChange = (audiences: string[]) => {
    dispatch({ type: 'SET_AUDIENCES', payload: audiences });
  };

  const toggleAudience = (value: string) => {
    const newList = selectedAudiences.includes(value)
      ? selectedAudiences.filter((item) => item !== value)
      : [...selectedAudiences, value];
    onSelectedAudiencesChange(newList);
  };

  if (isLoading) return <Skeleton className="h-9 w-[160px] border-dashed" />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-dashed min-w-[160px] justify-start"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Público
          {selectedAudiences.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 rounded-sm px-1 font-normal"
            >
              {selectedAudiences.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filtrar públicos..." />
          <CommandList>
            <CommandEmpty>Nenhum público encontrado.</CommandEmpty>
            <CommandGroup>
              {audiences.map((option) => {
                const isSelected = selectedAudiences.includes(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => toggleAudience(option)}
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
            {selectedAudiences.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onSelectedAudiencesChange([])}
                    className="justify-center cursor-pointer"
                  >
                    Limpar públicos
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
