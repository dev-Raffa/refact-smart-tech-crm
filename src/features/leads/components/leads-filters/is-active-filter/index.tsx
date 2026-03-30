import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';

export type ActiveFilterValue = 'OnlyFinalized' | 'OnlyInProgress' | 'All';

export function LeadsIsActiveFilter() {
  const { state, dispatch } = useLeadsBoardContext();
  const value = state.withConversationStatus;

  const onChange = (newValue: ActiveFilterValue) => {
    dispatch({ type: 'SET_STATUS', payload: newValue });
  };
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as ActiveFilterValue)}
    >
      <SelectTrigger className="w-[180px] h-9">
        <SelectValue placeholder="Filtrar por status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">Todos</SelectItem>
        <SelectItem value="OnlyInProgress">Em andamento</SelectItem>
        <SelectItem value="OnlyFinalized">Finalizado</SelectItem>
      </SelectContent>
    </Select>
  );
}
