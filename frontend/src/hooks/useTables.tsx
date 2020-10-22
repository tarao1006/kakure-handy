import { useSelector, useDispatch } from 'react-redux';
import { CombinedState, INITIALIZE_TABLE, UPDATE } from '../reducers';
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
      type: UPDATE,
      table
    });
  };

  return { tables, targetTable, initializeTable, updateTable }
}

export default useTables;
