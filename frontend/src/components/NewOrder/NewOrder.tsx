import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth';
import Loading from '../Loading';
import NewOrderStepper from './Stepper';
import useItems from '../../hooks/useItems';
import { Item, Table, convertToItems, convertToTables, MIN_ORDER_COUNT, MAX_ORDER_COUNT } from '../../model';
import { getTables } from '../../api/table';
import { getItems } from '../../api/item';
import { createOrder } from '../../api/order';

export const NewOrder = () => {
  const { currentUser } = React.useContext(AuthContext);
  const history = useHistory();
  const [token, setToken] = React.useState<string>("");
  const [tables, setTables] = React.useState<Table[]>([]);
  // const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [activeCategory, setActiveCategory] = React.useState<number>(0);
  const [targetTable, setTargetTable] = React.useState<Table | undefined>(undefined);
  // const [targetItems, setTargetItems] = React.useState<Item[]>([]);
  const { items, targetItems, initialize, add, increment, decrement } = useItems();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp && currentUser) {
        const newToken = await currentUser.getIdToken();
        const newTables = convertToTables(await getTables(newToken)).filter(table => !table.isEnded);
        const newItems = convertToItems(await getItems(newToken));
        setToken(newToken);
        setTables(newTables);
        initialize(newItems);
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
    add(newItem);
    // let newItems = [...items];
    // const itemIdx = newItems.findIndex(element => element.id === newItem.id);
    // newItems[itemIdx] = newItem;
    // setItems(newItems);

    // let newTargetItems = [...targetItems];
    // const targetItemIdx = newTargetItems.findIndex(element => element.id === newItem.id);
    // if (targetItemIdx === -1) {
    //   newTargetItems.push(newItem);
    // } else {
    //   newTargetItems[targetItemIdx] = newItem;
    // }
    // setTargetItems(newTargetItems);
  }

  const handleIncrement = (id: number): void => {
    increment(id);
    // const newItem = findNewItem(id);
    // if (newItem === undefined) {
    //   return;
    // }
    // newItem.count = Math.min(newItem.count + 1, MAX_ORDER_COUNT);
    // handleSetItem(newItem);
  }

  const handleDecrement = (id: number): void => {
    decrement(id);
    // const newItem = findNewItem(id);
    // if (newItem === undefined) {
    //   return;
    // }
    // newItem.count = Math.max(newItem.count - 1, MIN_ORDER_COUNT);
    // handleSetItem(newItem);
  }

  const findNewItem = (id: number): Item | undefined => {
    const targetItemIdx = targetItems.findIndex(element => element.id === id);
    let newItem: Item;
    if (targetItemIdx === -1) {
      const item = items.find(item => item.id === id);
      if (item === undefined) {
        return undefined;
      }
      newItem = Object.assign({}, item);
    } else {
      newItem = Object.assign({}, targetItems[targetItemIdx]);
    }
    return newItem;
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
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveStep={setActiveStep}
      />
    )
  )
}
