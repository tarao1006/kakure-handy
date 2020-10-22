import { useSelector, useDispatch } from 'react-redux';
import { CombinedState, INITIALIZE_TABLE, UPDATE_TABLE, RESET_TABLE } from '../reducers';
import { Table } from '../model';

const useTables = () => {

  const dispatch = useDispatch();
  const tables = useSelector<CombinedState, Table[]>(state => state.tables.tables);
  const targetTable = useSelector<CombinedState, Table>(state => state.tables.targetTable);

  const initializeTable = (tables: Table[]) => {
    dispatch({
      type: INITIALIZE_TABLE,
      tables
    });
  };

  const updateTable = (table: Table) => {
    dispatch({
      type: UPDATE_TABLE,
      table
    });
  };

  const resetTable = () => {
    dispatch({
      type: RESET_TABLE
    })
  }

  return { tables, targetTable, initializeTable, updateTable, resetTable }
}

export default useTables;
