import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { Loading } from '@molecules';
import { NewOrderStepper } from '@organisms';
import useItems from '../../hooks/useItems';
import useTables from '../../hooks/useTables';
import { convertToItems, convertToTables } from '@model';
import { getTables, getItems, createOrder } from '@api';

export const NewOrder = () => {
  const { currentUser } = React.useContext(AuthContext);
  const history = useHistory();
  const [token, setToken] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [activeCategory, setActiveCategory] = React.useState<number>(0);
  const { targetItems, initializeItem } = useItems();
  const { targetTable, initializeTable, resetTable } = useTables();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      setIsLoading(true);
      if (!cleanedUp && currentUser) {
        const newToken = await currentUser.getIdToken();
        const newTables = convertToTables(await getTables(newToken)).filter(table => !table.isEnded);
        const res = await getItems(newToken);
        const newItems = convertToItems(res);
        setToken(newToken);
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
    if (currentUser) {
      setIsLoading(true);
      const res = await createOrder(token, targetTable.id, targetItems);
      if (res.length !== 0) {
        history.push('/order-success');
        resetTable();
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
