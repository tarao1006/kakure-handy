import { Table } from '../model';

export const INITIALIZE_TABLE = 'INITIALIZE_TABLE';
export const UPDATE = 'UPDATE';

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
        tables: action.tables,
        targetTable: undefined
      };
    case UPDATE:
      return {
        ...state,
        targetTable: action.table
      }
    default:
      return state;
  }
}
