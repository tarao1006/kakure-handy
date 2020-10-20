import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getTable } from '../api/table'
import { Table, convertToTable } from '../model';
import useUser from '../hooks/useUser';

interface TableParams {
  id: string
}

const Table = () => {
  const { id } = useParams<TableParams>();
  const { userStatus } = useUser();
  const [table, setTable] = React.useState<Table | undefined>();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (userStatus.user) {
          const token = await userStatus.user.getIdToken();
          let t = await getTable(token, id);
          t = convertToTable(t);
          setTable(t);
        }
      }
    }
    fetch();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [userStatus.user])

  return (
    <h1> {table ? table.id : ""}</h1>
  )
}

export default Table;
