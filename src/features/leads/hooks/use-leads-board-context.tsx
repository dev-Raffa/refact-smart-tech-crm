import { createContext, useContext, useMemo, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLeadsFilters } from './use-leads-filters';
import type {
  LeadsFiltersState,
  LeadsFiltersAction
} from './use-leads-filters';
import { useOperatorsByRoleQuery } from './use-queries';
import type { LeadOperator, LeadProduct } from '../types/lead.model';

interface LeadsBoardContextValue {
  state: LeadsFiltersState;
  dispatch: React.Dispatch<LeadsFiltersAction>;
  availableOperators: LeadOperator[];
  isLoadingOperators: boolean;
}

export const LeadsBoardContext = createContext<
  LeadsBoardContextValue | undefined
>(undefined);

interface LeadsBoardProviderProps {
  children: ReactNode;
  defaultProducts: LeadProduct[];
  operatorRole: string;
}

export function LeadsBoardProvider({
  children,
  defaultProducts,
  operatorRole
}: LeadsBoardProviderProps) {
  const [state, dispatch] = useLeadsFilters(defaultProducts);
  const isInitialized = useRef(false);

  const { data: operators = [], isLoading: isLoadingOperators } =
    useOperatorsByRoleQuery(operatorRole);

  useEffect(() => {
    if (!isLoadingOperators && !isInitialized.current) {
      isInitialized.current = true;
      if (operators.length > 0) {
        const allIds = operators.map((op) => op.id);
        dispatch({ type: 'SET_OPERATOR_IDS', payload: allIds });
      }
    }
  }, [isLoadingOperators, operators, dispatch]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      availableOperators: operators,
      isLoadingOperators
    }),
    [state, operators, isLoadingOperators]
  );

  return (
    <LeadsBoardContext.Provider value={value}>
      {children}
    </LeadsBoardContext.Provider>
  );
}

export function useLeadsBoardContext() {
  const context = useContext(LeadsBoardContext);
  if (!context) {
    throw new Error(
      'useLeadsBoardContext must be used within a LeadsBoardProvider'
    );
  }
  return context;
}
