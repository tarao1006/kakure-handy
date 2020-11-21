import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@atoms';
import { AuthContext } from '../../../contexts/auth';
import { getTable, createBill } from '@api';
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

  const handleBill = async () => {
    const token = await currentUser.getIdToken();
    createBill(token, id);
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
              <TableCell>
                数量
              </TableCell>
              <TableCell>
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
                  <TableCell>
                    {detail.quantity}
                  </TableCell>
                  <TableCell>
                    {detail.status}
                  </TableCell>
                </TableRow>)
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={handleBill}>
        会計
      </button>
    </div>
    : <></>)
  )
}
