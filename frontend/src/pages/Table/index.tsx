import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Loading } from '@molecules';
import { AuthContext, LayoutContext} from '@contexts';
import { getTable, exitTable, createBill, deleteBill, updateOrder } from '@api';
import { Table as TableModel, convertToTable } from '@model';
import { TableTemplate } from '@templates';

interface TableParams {
  tableId: string
}

export const TableDetail = () => {
  const { currentUser } = React.useContext(AuthContext);
  const { setHeaderTitle } = React.useContext(LayoutContext);
  const { tableId } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const history = useHistory();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (currentUser) {
          updateTable();
        }
      }
    }
    fetch();
    return () => {
      cleanedUp = true;
    };
  }, [currentUser])

  const updateTable = async () => {
    setIsLoading(true);
    const token = await currentUser.getIdToken();
    const res = await getTable(token, tableId);
    const newTable = convertToTable(res);
    if (newTable.isEnded) {
      setIsLoading(false);
      setHeaderTitle("");
      history.push("/");
    } else {
      setHeaderTitle(newTable.room.name);
      setTable(newTable);
      setIsLoading(false);
    }
  }

  const handleCreateBill = async () => {
    const token = await currentUser.getIdToken();
    await createBill(token, tableId);
    await updateTable();
  }

  const handleDeleteBill = async () => {
    const token = await currentUser.getIdToken();
    await deleteBill(token, tableId, `${table.billId}`);
    await updateTable();
  }

  const handleExitTable = async () => {
    const token = await currentUser.getIdToken();
    await exitTable(token, tableId);
    await updateTable();
  }

  const handleUpdateOrder = async (id: number, status: number) => {
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, status);
    await updateTable();
  }

  return (
    <>
      {isLoading && <Loading />}
      {
        table !== undefined &&
        <TableTemplate
          table={table}
          handleUpdateTable={updateTable}
          handleUpdateOrder={handleUpdateOrder}
          handleCreateBill={handleCreateBill}
          handleDeleteBill={handleDeleteBill}
          handleExitTable={handleExitTable}
        />
      }
    </>
  )
}
