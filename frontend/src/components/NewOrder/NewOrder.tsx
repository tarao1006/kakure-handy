import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth';
import Loading from '../Loading';
import NewOrderStepper from './Stepper';
import useItems from '../../hooks/useItems';
import useTables from '../../hooks/useTables';
import { Table, convertToItems, convertToTables } from '../../model';
import { getTables } from '../../api/table';
import { getItems } from '../../api/item';
import { createOrder } from '../../api/order';

export const NewOrder = () => {
  const { currentUser } = React.useContext(AuthContext);
  const history = useHistory();
  const [token, setToken] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [activeCategory, setActiveCategory] = React.useState<number>(0);
  const { items, targetItems, initializeItem } = useItems();
  const { tables, targetTable, initializeTable, updateTable } = useTables();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp && currentUser) {
        const newToken = await currentUser.getIdToken();
        const newTables = convertToTables(await getTables(newToken)).filter(table => !table.isEnded);
        const newItems = convertToItems(await getItems(newToken));
        setToken(newToken);
        initializeTable(newTables);
        initializeItem(newItems);
      }
    }
    fetch();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [currentUser]);

  React.useEffect(() => {
    if (tables === undefined || items === undefined) {
      return;
    }
    if (tables.length === 0 || items.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [tables, items]);

  const handleOrder = async () => {
    if (currentUser) {
      const order = await createOrder(token, targetTable.id, targetItems);
      history.push('/');
    }
  }

  const handleSetTable = (table: Table): void => {
    updateTable(table);
  }

  return (
    isLoading
    ? (<Loading />)
    : (
      <NewOrderStepper
        tables={tables}
        targetTable={targetTable}
        handleSetTable={handleSetTable}
        handleOrder={handleOrder}
        activeStep={activeStep}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveStep={setActiveStep}
      />
    )
  )
}
