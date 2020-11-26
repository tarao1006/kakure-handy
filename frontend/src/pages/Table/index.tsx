import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Loading, OperationSnackbar } from '@molecules';
import { OrderStatusList, TableInformation, BillOperationButton } from '@organisms';
import { AuthContext, LayoutContext} from '@contexts';
import { getTable, exitTable, createBill, deleteBill, updateOrder } from '@api';
import { Table as TableModel, convertToTable } from '@model';

interface TableParams {
  tableId: string
}

export const TableDetail = () => {
  const { currentUser } = React.useContext(AuthContext);
  const { setHeaderTitle } = React.useContext(LayoutContext);
  const { tableId } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [topic, setTopic] = React.useState<string>('');

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          updateTable(token);
        }
      }
    }
    fetch();
    return () => {
      cleanedUp = true;
    };
  }, [currentUser])

  const updateTable = async (token: string) => {
    setIsLoading(true);
    const res = await getTable(token, tableId);
    const newTable = convertToTable(res);
    setHeaderTitle(newTable.room.name);
    setTable(newTable);
    setIsLoading(false);
  }

  const handleCreateBill = async () => {
    const token = await currentUser.getIdToken();
    await createBill(token, tableId);
    await updateTable(token);
    setTopic('会計');
    handleSnackBarOpen();
  }

  const handleDeleteBill = async () => {
    const token = await currentUser.getIdToken();
    await deleteBill(token, tableId, `${table.billId}`);
    await updateTable(token);
    setTopic('会計取消');
    handleSnackBarOpen();
  }

  const handleExit = async () => {
    const token = await currentUser.getIdToken();
    await exitTable(token, tableId);
    await updateTable(token);
    setTopic('退店');
    handleSnackBarOpen();
  }

  const handleServed = async (id: number) => {
    setDisabled(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 2);
    await updateTable(token);
    setDisabled(false);
    setTopic('提供済にする');
    handleSnackBarOpen();
  }

  const handleCancel = async (id: number) => {
    setDisabled(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 3);
    await updateTable(token);
    setDisabled(false);
    setTopic('キャンセルする');
    handleSnackBarOpen();
  }

  const handleOrdered = async (id: number) => {
    setDisabled(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 1);
    await updateTable(token);
    setDisabled(false);
    setTopic('注文済に戻す');
    handleSnackBarOpen();
  }

  const handleSnackBarOpen = () => {
    setOpen(true);
  }

  const handleSnackBarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <>
      {isLoading && <Loading />}
      <TableInformation table={table} />
      <BillOperationButton
        operation="会計"
        disabled={table.validBillExists()}
        handleExecute={handleCreateBill}
      />
      <BillOperationButton
        operation="会計取消"
        disabled={!table.validBillExists() || table.isEnded}
        handleExecute={handleDeleteBill}
      />
      <BillOperationButton
        operation="退店"
        subTopic='退店処理は取り消せません。'
        disabled={!table.validBillExists() || table.isEnded}
        handleExecute={handleExit}
      />
      <OrderStatusList
        disabled={disabled}
        orders={table.orders}
        handleServed={handleServed}
        handleCancel={handleCancel}
        handleOrdered={handleOrdered}
      />
      <OperationSnackbar
        open={open}
        operation={topic}
        handleClose={handleSnackBarClose}
      />
    </>
  )
}
