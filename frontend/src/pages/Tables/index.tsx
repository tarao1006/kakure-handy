import * as React from 'react';
import { AuthContext } from '@contexts';
import { getTables } from '@api'
import { Loading } from '@molecules'
import { TablesTemplate } from '@templates';
import { Table, convertToTables } from '@model';

export const Tables = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [tables, setTables] = React.useState<Table[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      setIsLoading(true);
      if (!cleanedUp) {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          let res = await getTables(token);
          const newTables = convertToTables(res);
          setTables(newTables.filter(newTable => !newTable.isEnded));
        }
      }
      setIsLoading(false);
    }
    fetch();
    return () => {
      cleanedUp = true;
    };
  }, [currentUser]);

  return (
    isLoading ? <Loading /> : <TablesTemplate tables={tables} />
  )
}
