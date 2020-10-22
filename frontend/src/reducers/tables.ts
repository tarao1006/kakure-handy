import { Table } from '../model';

export const INITIALIZE_TABLE = 'INITIALIZE_TABLE';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const RESET_TABLE = 'RESET_TABLE';

export interface TableState {
  tables: Table[];
  targetTable: Table;
}

const initialState: TableState = {
  tables: [],
  targetTable: undefined,
}

export const tables = (state = initialState, action: any) => {

  switch (action.type) {
    case INITIALIZE_TABLE:
      return {
        ...state,
        tables: action.tables,
      };
    case UPDATE_TABLE:
      return {
        ...state,
        targetTable: action.table
      }
    case RESET_TABLE:
      return {
        ...state,
        targetTable: undefined
      }
    default:
      return state;
  }
}
