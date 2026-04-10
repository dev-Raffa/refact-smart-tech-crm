import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useRef,
  startTransition
} from 'react';
import type { ReactNode } from 'react';
import { useLeadsFilters } from '../components/leads-filters/use-leads-filters';
import type {
  LeadsFiltersState,
  LeadsFiltersAction
} from '../components/leads-filters/use-leads-filters';
import { useLeadFiltersValuesOptionsQuery } from './use-queries';
import type {
  LeadFiltersValuesOptions,
  LeadOperator,
  LeadSegments
} from '../types/lead.model';

interface LeadsBoardContextValue {
  state: LeadsFiltersState;
  dispatch: React.Dispatch<LeadsFiltersAction>;
  availableOperators: LeadOperator[];
}

export const LeadsBoardContext = createContext<
  LeadsBoardContextValue | undefined
>(undefined);

interface LeadsBoardProviderProps {
  children: ReactNode;
  defaultProducts: LeadSegments[];
}

export function LeadsBoardProvider({
  children,
  defaultProducts
}: LeadsBoardProviderProps) {
  const [state, dispatch] = useLeadsFilters(defaultProducts);
  const isInitialized = useRef(false);

  const { data: filterOptions = [], isLoading } =
    useLeadFiltersValuesOptionsQuery(defaultProducts[0]);

  useEffect(() => {
    if (!isLoading && !isInitialized.current) {
      isInitialized.current = true;
      const filters = filterOptions as LeadFiltersValuesOptions;
      dispatch({ type: 'SET_FILTER_OPTIONS', payload: filters });
    }
  }, [filterOptions, dispatch, isLoading]);

  const value = useMemo(
    () => ({
      state,
      dispatch: (action: LeadsFiltersAction) => {
        startTransition(() => {
          dispatch(action);
        });
      },
      availableOperators: (filterOptions as LeadFiltersValuesOptions).operators
    }),
    [state, filterOptions, dispatch]
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
