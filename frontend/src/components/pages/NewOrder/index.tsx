import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../modules/auth';
import { Loading } from '@molecules';
import NewOrderStepper from './Stepper';
import useItems from '../../../hooks/useItems';
import useTables from '../../../hooks/useTables';
import { convertToItems, convertToTables } from '../../../model';
import { getTables, getItems, createOrder } from '../../../api';

export const NewOrder = () => {
  const { currentUser } = React.useContext(AuthContext);
  const history = useHistory();
  const [token, setToken] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [activeCategory, setActiveCategory] = React.useState<number>(0);
  const { items, targetItems, initializeItem } = useItems();
  const { tables, targetTable, initializeTable, resetTable } = useTables();

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
      setIsLoading(true);
    } else if (tables.length === 0 || items.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [tables, items]);

  const handleOrder = async () => {
    if (currentUser) {
      setIsLoading(true);
      const res = await createOrder(token, targetTable.id, targetItems);
      if (res === 201) {
        history.push('/order-success');
        resetTable();
      } else {
        
      }
    }
  }

  return (
    isLoading
    ? (<Loading />)
    : (
      <NewOrderStepper
        handleOrder={handleOrder}
        activeStep={activeStep}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveStep={setActiveStep}
      />
    )
  )
}
