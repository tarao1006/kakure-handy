import { useEffect, useReducer, useState } from 'react';
import { Table, convertToTables } from '../model';
import { getTables } from '@api';

interface State {
  isLoading: boolean;
  isError: boolean;
  data: Table[];
}

interface Action {
  type: string;
  payload?: Table[];
}

const tablesFetchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useTablesApi = () => {
  const [token, setToken] = useState<string>('');
  const [state, dispatch] = useReducer(tablesFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const fetchTables = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const res = await getTables(token);
      const tables = convertToTables(res);
      try {
        dispatch({ type: 'FETCH_SUCCESS', payload: tables });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR' })
      }
    }
    if (token !== '') {
      fetchTables();
    }
  }, [token]);

  return [state, setToken];
}
