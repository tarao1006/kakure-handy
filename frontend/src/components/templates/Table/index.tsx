import * as React from 'react';
import { OperationSnackbar } from '@molecules';
import { OrderStatusList, TableInformation, BillOperationButton } from '@organisms';
import { Table } from '@model';

interface TableTemplateProps {
  table: Table;
  handleUpdateTable: () => Promise<void>;
  handleUpdateOrder: (id: number, status: number) => Promise<void>;
  handleCreateBill: () => Promise<void>;
  handleDeleteBill: () => Promise<void>;
  handleExitTable: () => Promise<void>;
}

export const TableTemplate = ({
  table,
  handleUpdateTable,
  handleUpdateOrder,
  handleCreateBill,
  handleDeleteBill,
  handleExitTable
}: TableTemplateProps): JSX.Element => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [topic, setTopic] = React.useState<string>('');

  const createBill = async () => {
    await handleCreateBill();
    await handleUpdateTable();
    setTopic('会計');
    handleSnackBarOpen();
  }

  const deleteBill = async () => {
    await handleDeleteBill();
    await handleUpdateTable();
    setTopic('会計取消');
    handleSnackBarOpen();
  }

  const exitTable = async () => {
    await handleExitTable();
  }

  const handleServed = async (id: number) => {
    setDisabled(true);
    await handleUpdateOrder(id, 2);
    await handleUpdateTable();
    setDisabled(false);
    setTopic('提供済にする');
    handleSnackBarOpen();
  }

  const handleCancel = async (id: number) => {
    setDisabled(true);
    await handleUpdateOrder(id, 3);
    await handleUpdateTable();
    setDisabled(false);
    setTopic('キャンセルする');
    handleSnackBarOpen();
  }

  const handleOrdered = async (id: number) => {
    setDisabled(true);
    await handleUpdateOrder(id, 1);
    await handleUpdateTable();
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
      <TableInformation table={table} />
      <BillOperationButton
        operation="会計"
        disabled={table.validBillExists()}
        handleExecute={createBill}
      />
      <BillOperationButton
        operation="会計取消"
        disabled={!table.validBillExists() || table.isEnded}
        handleExecute={deleteBill}
      />
      <BillOperationButton
        operation="退店"
        subTopic='退店処理は取り消せません。'
        disabled={!table.validBillExists() || table.isEnded}
        handleExecute={exitTable}
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
