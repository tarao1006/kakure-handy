import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth';
import NewOrderStepper from './Stepper';
import {
  Table,
  Item,
  convertToTables,
  convertToItems,
} from '../../model';
import Loading from '../Loading';
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

  const handleSetTable = (table: Table) => {
    setTargetTable(table);
    // setActiveStep(activeStep + 1);
  }

  const handleSetItems = (item: Item) => {
  }

  const handleIncrement = (id: number) => {
    let newTargetItems = [...targetItems];
    newTargetItems.forEach(item => {
      if (id === item.id) {
        item.count++;
      }
      return item;
    });
    setTargetItems(newTargetItems);
  }

  const handleDecrement = (id: number) => {
    let newTargetItems = [...targetItems];
    newTargetItems.forEach(item => {
      if (id === item.id) {
        item.count = Math.max(0, item.count - 1);
      }
      return item;
    });
    setTargetItems(newTargetItems);
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
        handleSetItems={handleSetItems}
        handleOrder={handleOrder}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    )
  )
}
