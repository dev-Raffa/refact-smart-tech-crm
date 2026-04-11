import { Check, LoaderIcon, PlusCircle } from 'lucide-react';
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
  CommandList
} from '@/shared/components/ui/command';
import { cn } from '@/shared/utils';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';
import type { OldLeadOperator } from '../../../types/lead.model';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function LeadsOperatorsFilter() {
  const {
    state,
    dispatch,
    availableOperators: rawOperators
  } = useLeadsBoardContext();
  const isLoading = state.isFilterOptionsLoading;
  const selectedOperatorIds = state.operatorIds;

  const onOperatorIdsChange = (ids: string[]) => {
    dispatch({ type: 'SET_OPERATOR_IDS', payload: ids });
  };

  const availableOperators = rawOperators?.filter(
    (op): op is OldLeadOperator => !!op
  );
  const hasOnlyOneAvailableOperator = availableOperators?.length === 1;

  if (!isLoading && !availableOperators.length) return null;

  if (isLoading) return <Skeleton className="h-9 w-[200px] border-dashed" />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-dashed min-w-[200px] justify-start flex"
          disabled={availableOperators?.length < 2}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>Carregando...</span>
            </div>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Operadores
              {selectedOperatorIds?.length > 0 && (
                <>
                  <Badge
                    variant="secondary"
                    className="ml-2 rounded-sm px-1 font-normal lg:hidden"
                  >
                    {selectedOperatorIds?.length}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex ml-2">
                    {selectedOperatorIds?.length > 1 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {selectedOperatorIds?.length} selec.
                      </Badge>
                    ) : (
                      rawOperators
                        .filter((op) => selectedOperatorIds.includes(op.id))
                        .map((op) => (
                          <Badge
                            variant="secondary"
                            key={op.id}
                            className="rounded-sm px-1 font-normal max-w-[150px] truncate"
                          >
                            {op.name}
                          </Badge>
                        ))
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Selecione operadores..." />
          <CommandList>
            <CommandEmpty>Nenhum operador encontrado.</CommandEmpty>
            <CommandGroup>
              {(() => {
                const allSelected =
                  availableOperators.length > 0 &&
                  availableOperators.every((op) =>
                    selectedOperatorIds.includes(op.id)
                  );
                return (
                  <CommandItem
                    className="cursor-pointer font-medium"
                    key="__select-all__"
                    onSelect={() => {
                      if (allSelected) {
                        onOperatorIdsChange?.([]);
                      } else {
                        onOperatorIdsChange?.(
                          availableOperators.map((op) => op.id)
                        );
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        allSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className={cn('h-4 w-4')} />
                    </div>
                    <span>Selecionar todos</span>
                  </CommandItem>
                );
              })()}

              {availableOperators.map((operator) => {
                const isSelected = selectedOperatorIds.includes(operator.id);
                return (
                  <CommandItem
                    className="cursor-pointer"
                    key={operator.id}
                    onSelect={() => {
                      if (isSelected) {
                        if (
                          hasOnlyOneAvailableOperator ||
                          selectedOperatorIds.length === 1
                        )
                          return;
                        onOperatorIdsChange?.(
                          selectedOperatorIds.filter((id) => id !== operator.id)
                        );
                      } else {
                        onOperatorIdsChange?.([
                          ...selectedOperatorIds,
                          operator.id
                        ]);
                      }
                    }}
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
                    <span>{operator.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
