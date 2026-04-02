import { useState } from 'react';
import { Check, ChevronsUpDown, UserCog } from 'lucide-react';

import { cn } from '@/shared/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/ui/popover';

import { useLeadsBoardContext } from '../../hooks/use-leads-board-context';
import { useChangeOperatorMutation } from '../../hooks/use-mutations';
import type { Lead } from '../../types/lead.model';

interface LeadChangeOperatorProps {
  lead: Lead;
}

export function LeadChangeOperator({ lead }: LeadChangeOperatorProps) {
  const [open, setOpen] = useState(false);
  const { availableOperators: operators } = useLeadsBoardContext();
  const changeOperatorMutation = useChangeOperatorMutation();

  const currentOperatorId = lead.operator?.id ?? '';

  // Logic to ensure the current operator is in the list even if not in the availableOperators
  const isCurrentInList =
    lead.operator && operators.some((op) => op.id === lead.operator?.id);

  const displayOperators =
    !isCurrentInList && lead.operator
      ? [lead.operator, ...operators]
      : operators;

  const handleSelect = (operatorId: string) => {
    if (operatorId === currentOperatorId) {
      setOpen(false);
      return;
    }

    const operator = displayOperators.find((op) => op.id === operatorId);

    if (!operator) {
      setOpen(false);
      return;
    }

    changeOperatorMutation.mutate({
      leadId: lead.id,
      operator: {
        id: operator.id,
        name: operator.name,
        username: operator.username
      }
    });
    setOpen(false);
  };

  const currentOperatorName = lead.operator?.name || 'Sem operador';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="h-6 w-fit min-w-[120px] max-w-[200px] bg-stone-50 dark:bg-neutral-800 border-none shadow-none hover:bg-muted transition-colors p-0! pr-1.5! text-emerald-600 dark:text-emerald-400 font-medium text-[12px] justify-between group/trigger"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1.5 truncate">
            <UserCog className="size-3.5 shrink-0" />
            <span className="truncate">{currentOperatorName}</span>
          </div>
          <ChevronsUpDown className="size-3 shrink-0 opacity-50 group-hover/trigger:opacity-100 transition-opacity ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[250px] p-0"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <CommandInput placeholder="Pesquisar operador..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum operador encontrado.</CommandEmpty>
            <CommandGroup heading="Operadores Disponíveis">
              {displayOperators.map((operator) => (
                <CommandItem
                  key={operator.id}
                  value={operator.name}
                  onSelect={() => handleSelect(operator.id)}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <div className="flex  text-[12px] items-center gap-2">
                    <UserCog className="size-3.5 text-muted-foreground" />
                    <span>{operator.name}</span>
                  </div>
                  <Check
                    className={cn(
                      'size-3.5 text-emerald-600',
                      currentOperatorId === operator.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
