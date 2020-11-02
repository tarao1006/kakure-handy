import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../modules/auth';
import { getTable } from '../../../api/table'
import { Table as TableModel, convertToTable } from '../../../model';

interface TableParams {
  id: string
}

export const Table = () => {
  const { currentUser } = React.useContext(AuthContext);
  const { id } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (currentUser) {
          const token = await currentUser.getIdToken();
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
  }, [currentUser])

  return (
    <h1> {table ? table.id : ""}</h1>
  )
}
