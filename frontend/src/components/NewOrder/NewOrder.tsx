import * as React from 'react';
import { useHistory } from 'react-router-dom';
import NewOrderStepper, { 
  SelectItem,
  SelectTable,
  Confirmation,
} from './Stepper';
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
import useUser from '../../hooks/useUser';

const NewOrder = () => {
  const { userStatus } = useUser();
  const history = useHistory();
  const [token, setToken] = React.useState<string>();
  const [tables, setTables] = React.useState<Table[]>([]);
  const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [targetTable, setTargetTable] = React.useState<{id: number, name: string}>();
  const [targetItems, setTargetItems] = React.useState<{id: number, name: string, count: number}[]>([]);

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp && userStatus.user) {
        const newToken = await userStatus.user.getIdToken();
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
  }, [userStatus.user]);

  React.useEffect(() => {
    if (tables.length === 0 || items.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [tables, items]);

  const handleOrder = async () => {
    if (userStatus.user) {
      const order = await createOrder(token, targetTable.id, targetItems);
      history.push('/');
    }
  }

  const handleSetTable = (id: number, name: string) => {
    setTargetTable({ id, name });
    // setActiveStep(activeStep + 1);
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
    :
    <NewOrderStepper
      selectTable={
        {
          label: "テーブル",
          component: <SelectTable tables={tables} handleSet={handleSetTable} defaultValue={targetTable} />,
          disabled: targetTable === undefined,
        }
      }
      selectItem={
        {
          label: "注文",
          component: <SelectItem items={items} handleSet={setTargetItems} defaultCheckedList={targetItems} />,
          disabled: targetItems === undefined,
        }
      }
      confirmation={
        {
          label: "確定",
          component: <Confirmation table={targetTable} items={targetItems} increment={handleIncrement} decrement={handleDecrement} />,
          disabled: false,
        }
      }
      handleOrder={handleOrder}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    />
  )
}

export default NewOrder;
