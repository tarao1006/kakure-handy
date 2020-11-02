export { INITIALIZE_TABLE, UPDATE_TABLE, RESET_TABLE } from './tables';
export { INITIALIZE_ITEM, ADD_ITEM, INCREMENT_ITEM, DECREMENT_ITEM} from './items';
import { createStore, combineReducers } from 'redux';
import { items, ItemState} from './items';
import { tables, TableState } from './tables';

const reducer = combineReducers({
  items,
  tables
});

export interface CombinedState {
  items: ItemState;
  tables: TableState;
}

export const store = createStore(reducer);
