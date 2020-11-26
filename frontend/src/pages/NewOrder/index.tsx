import * as React from 'react';
import { useHistory } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import useTables from '../../hooks/useTables';
import { AuthContext } from '@contexts';
import { convertToItems, convertToTables } from '@model';
import { getTables, getItems, createOrder } from '@api';
import { Loading } from '@molecules';
import { NewOrderTemplate } from '@templates';

export const NewOrder = () => {
  const { currentUser } = React.useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { targetItems, initializeItem } = useItems();
  const { targetTable, initializeTable, resetTable } = useTables();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      setIsLoading(true);
      if (!cleanedUp && currentUser) {
        const token = await currentUser.getIdToken();
        const resTables = await getTables(token);
        const newTables = convertToTables(resTables).filter(table => !table.isEnded);
        const resItems = await getItems(token);
        const newItems = convertToItems(resItems);
        initializeTable(newTables);
        initializeItem(newItems);
      }
      setIsLoading(false);
    }
    fetch();
    return () => {
      cleanedUp = true;
    };
  }, [currentUser]);

  const handleOrder = async () => {
    setIsLoading(true);
    const token = await currentUser.getIdToken();
    const res = await createOrder(token, targetTable.id, targetItems);
    if (res.length !== 0) {
      setIsLoading(false);
      history.push('/order-success');
      resetTable();
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <NewOrderTemplate handleOrder={handleOrder}/>
    </>
  )
}
