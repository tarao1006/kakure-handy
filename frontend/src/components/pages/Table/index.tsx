import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@atoms';
import { AuthContext } from '../../../contexts/auth';
import { getTable, exitTable, createBill, deleteBill } from '@api';
import { Table as TableModel, convertToTable } from '../../../model';

interface TableParams {
  id: string
}

export const TableDetail = () => {
  const { currentUser } = React.useContext(AuthContext);
  const { id } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          let t = await getTable(token, id);
          t = convertToTable(t);
          setTable(t);
        }
      }
    }
    fetch();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [currentUser])

  const handleCreateBill = async () => {
    const token = await currentUser.getIdToken();
    createBill(token, id);
  }

  const handleDeleteBill = async () => {
    const token = await currentUser.getIdToken();
    deleteBill(token, id, `${table.latestBillId}`);
  }

  const handleExit = async () => {
    const token = await currentUser.getIdToken();
    exitTable(token, id);
  }

  return (
    (table
    ?
    <div>
      <h1> {table.id}</h1>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                名前
              </TableCell>
              <TableCell align="center">
                数量
              </TableCell>
              <TableCell align="center">
                状態
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              table.orders.map(order => order.details.map(
                detail => (
                <TableRow key={`${order.id}${detail.id}`}>
                  <TableCell>
                    {detail.itemName}
                  </TableCell>
                  <TableCell align="center">
                    {detail.quantity}
                  </TableCell>
                  <TableCell align="center">
                    {detail.status}
                  </TableCell>
                </TableRow>)
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={handleCreateBill} disabled={table.billCnt != 0}>
        会計
      </button>
      <button onClick={handleDeleteBill} disabled={table.isEnded}>
        会計取消
      </button>
      <button onClick={handleExit} disabled={table.billCnt === 0 || table.isEnded}>
        退店
      </button>
    </div>
    : <></>)
  )
}
