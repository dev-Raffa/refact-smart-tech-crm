import { useReducer } from 'react';
import type {
  LeadFiltersValuesOptions,
  LeadProduct
} from '../../types/lead.model';
import type { LeadsTextFilterType } from './text-filter/use-text-filter';
import { format, subDays } from 'date-fns';

export interface LeadsFiltersState {
  products: LeadProduct[];
  isFilterOptionsLoading: boolean;
  filterOptions: LeadFiltersValuesOptions;
  withConversationStatus: 'All' | 'OnlyFinalized' | 'OnlyInProgress';
  operatorIds: string[];
  dateIni: string | null;
  dateEnd: string | null;
  source: string[];
  audience: string[];
  name: string | null;
  cpf: string | null;
  phoneNumber: string | null;
  proposalNumber: string | null;
}

export type LeadsFiltersAction =
  | { type: 'SET_PRODUCTS'; payload: LeadProduct[] }
  | { type: 'SET_FILTER_OPTIONS'; payload: LeadFiltersValuesOptions }
  | { type: 'SET_STATUS'; payload: 'All' | 'OnlyFinalized' | 'OnlyInProgress' }
  | { type: 'SET_OPERATOR_IDS'; payload: string[] }
  | {
      type: 'SET_DATE_RANGE';
      payload: { start: string | null; end: string | null };
    }
  | { type: 'SET_SOURCES'; payload: string[] }
  | { type: 'SET_AUDIENCES'; payload: string[] }
  | {
      type: 'SET_TEXT_FILTER';
      payload: { type: LeadsTextFilterType; value: string | null };
    }
  | { type: 'RESET_FILTERS'; payload: { products: LeadProduct[] } };

function leadsFiltersReducer(
  state: LeadsFiltersState,
  action: LeadsFiltersAction
): LeadsFiltersState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_FILTER_OPTIONS':
      return {
        ...state,
        filterOptions: action.payload,
        isFilterOptionsLoading: false,
        operatorIds: action.payload.operators.map((op) => op.id)
      };
    case 'SET_STATUS':
      return { ...state, withConversationStatus: action.payload };
    case 'SET_OPERATOR_IDS':
      return { ...state, operatorIds: action.payload };
    case 'SET_DATE_RANGE':
      return {
        ...state,
        dateIni: action.payload.start,
        dateEnd: action.payload.end
      };
    case 'SET_SOURCES':
      return { ...state, source: action.payload };
    case 'SET_AUDIENCES':
      return { ...state, audience: action.payload };
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        name: action.payload.type === 'name' ? action.payload.value : null,
        cpf: action.payload.type === 'cpf' ? action.payload.value : null,
        phoneNumber:
          action.payload.type === 'phoneNumber' ? action.payload.value : null,
        proposalNumber:
          action.payload.type === 'proposalNumber' ? action.payload.value : null
      };
    case 'RESET_FILTERS': {
      const now = new Date();
      const todayStr = format(now, 'yyyy-MM-dd');
      const startStr = format(subDays(now, 29), 'yyyy-MM-dd');

      return {
        products: action.payload.products,
        filterOptions: state.filterOptions,
        withConversationStatus: 'OnlyInProgress',
        operatorIds: [],
        dateIni: startStr,
        dateEnd: todayStr,
        source: [],
        audience: [],
        name: null,
        cpf: null,
        phoneNumber: null,
        proposalNumber: null,
        isFilterOptionsLoading: state.isFilterOptionsLoading
      };
    }
    default:
      return state;
  }
}

export function useLeadsFilters(defaultProducts: LeadProduct[]) {
  const now = new Date();
  const todayStr = format(now, 'yyyy-MM-dd');
  const startStr = format(subDays(now, 29), 'yyyy-MM-dd');

  const initialState: LeadsFiltersState = {
    products: defaultProducts,
    filterOptions: {
      audiences: [],
      operators: [],
      sources: []
    },
    isFilterOptionsLoading: true,
    withConversationStatus: 'OnlyInProgress',
    operatorIds: [],
    dateIni: startStr,
    dateEnd: todayStr,
    source: [],
    audience: [],
    name: null,
    cpf: null,
    phoneNumber: null,
    proposalNumber: null
  };

  const [state, dispatch] = useReducer(leadsFiltersReducer, initialState);

  return [state, dispatch] as const;
}
