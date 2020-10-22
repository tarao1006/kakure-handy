import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth';
import Loading from '../Loading';
import NewOrderStepper from './Stepper';
import { Item, Table, convertToItems, convertToTables } from '../../model';
import { getTables } from '../../api/table';
import { getItems } from '../../api/item';
import { createOrder } from '../../api/order';

export const NewOrder = () => {
  const { currentUser } = React.useContext(AuthContext);
  const history = useHistory();
  const [token, setToken] = React.useState<string>("");
  const [tables, setTables] = React.useState<Table[]>([]);
  const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [targetTable, setTargetTable] = React.useState<Table | undefined>(undefined);
  const [targetItems, setTargetItems] = React.useState<Item[] | undefined>(undefined);

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp && currentUser) {
        const newToken = await currentUser.getIdToken();
        const newTables = convertToTables(await getTables(newToken)).filter(table => !table.isEnded);
        const newItems = convertToItems(await getItems(newToken));
        setToken(newToken);
        setTables(newTables);
        setItems(newItems);
      }
    }
    fetch();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [currentUser]);

  React.useEffect(() => {
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
    setTargetTable(table);
  }

  const handleSetItem = (newItem: Item): void => {
    let newTargetItems = [...targetItems];
    const idx = newTargetItems.findIndex(element => element.id === newItem.id);
    if (idx === -1) {
      newTargetItems.push(newItem);
    } else {
      newTargetItems[idx] = newItem;
    }
    setTargetItems(newTargetItems);
  }

  const handleIncrement = (id: number): void => {
    let newItem = Object.assign({}, [...targetItems].find(element => element.id === id));
    if (Object.keys(newItem).length === 0) return;
    newItem.count = newItem.count + 1;
    handleSetItem(newItem);
  }

  const handleDecrement = (id: number): void => {
    let newItem = Object.assign({}, [...targetItems].find(element => element.id === id));
    if (Object.keys(newItem).length === 0) return;
    newItem.count = Math.max(newItem.count - 1, 0);
    handleSetItem(newItem);
  }

  return (
    isLoading
    ? (<Loading />)
    : (
      <NewOrderStepper
        tables={tables}
        items={items}
        targetTable={targetTable}
        targetItems={targetItems}
        handleSetTable={handleSetTable}
        handleSetItem={handleSetItem}
        handleOrder={handleOrder}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    )
  )
}
