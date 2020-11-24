import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Button,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableRow,
  TableCell,
  ExpandLess,
  ExpandMore
} from '@atoms';
import { Loading } from '@molecules';
import { AuthContext } from '../../../contexts/auth';
import { getTable, exitTable, createBill, deleteBill, updateOrder } from '@api';
import { Table as TableModel, convertToTable, OrderDetail } from '../../../model';
import { convertTimeToHM } from '../../../utils';
import { ModalListItem } from './ModalListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflowX: "auto",
    },
    operationButton: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  })
);

interface TableParams {
  tableId: string
}

export const TableDetail = () => {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);
  const { tableId } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();
  const [orderedOrder, setOrderedOrder] = React.useState<OrderDetail[]>([]);
  const [servedOrder, setServedOrder] = React.useState<OrderDetail[]>([]);
  const [cancelledOrder, setCancelledOrder] = React.useState<OrderDetail[]>([]);
  const [orderedOpen, setOrderedOpen] = React.useState<boolean>(false);
  const [servedOpen, setServedOpen] = React.useState<boolean>(false);
  const [cancelledOpen, setCancelledOpen] = React.useState<boolean>(false);
  const [disabledDialogButtons, setDisabledDialogButtons] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const history = useHistory();

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
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [currentUser])

  React.useEffect(() =>{
    if (table !== undefined) {
      setIsLoading(false);
    }
  })

  const updateTable = async (token: string) => {
    const res = await getTable(token, tableId);
    const t = convertToTable(res);
    setTable(t);

    let ordered: OrderDetail[] = [];
    let served: OrderDetail[] = [];
    let cancelled: OrderDetail[] = [];
    t.orders.forEach(order => order.details.forEach(detail => {
      if (detail.status === "ordered") {
        ordered.push(detail);
      } else if (detail.status === "served") {
        served.push(detail);
      } else if (detail.status === "cancelled") {
        cancelled.push(detail);
      }
    }))
    setOrderedOrder(ordered);
    setServedOrder(served);
    setCancelledOrder(cancelled);

    setOrderedOpen(ordered.length !== 0);
  }

  const handleCreateBill = async () => {
    const token = await currentUser.getIdToken();
    await createBill(token, tableId);
    await updateTable(token);
  }

  const handleDeleteBill = async () => {
    const token = await currentUser.getIdToken();
    await deleteBill(token, tableId, `${table.latestBillId}`);
    await updateTable(token);
  }

  const handleExit = async () => {
    const token = await currentUser.getIdToken();
    await exitTable(token, tableId);
    await updateTable(token);
  }

  const handleBack = () => {
    history.push('/tables');
  }

  const handleServed = async (id: number) => {
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 2);
    await updateTable(token);
    setDisabledDialogButtons(false);
  }

  const handleCancel = async (id: number) => {
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 3);
    await updateTable(token);
    setDisabledDialogButtons(false);
  }

  const handleOrdered = async (id: number) => {
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 1);
    await updateTable(token);
    setDisabledDialogButtons(false);
  }

  const handleOpenOrdered = () => {
    setOrderedOpen(!orderedOpen);
  }

  const handleOpenServed = () => {
    setServedOpen(!servedOpen);
  }

  const handleOpenCancelled = () => {
    setCancelledOpen(!cancelledOpen);
  }

  return (
    isLoading
    ? (<Loading />)
    :
    (
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Button
          color="inherit"
          component="a"
          onClick={handleBack} startIcon={<ArrowBackIcon />}
          style={{ backgroundColor: 'transparent' }}
          disableRipple={true}
        >
          一覧に戻る
        </Button>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                部屋
              </TableCell>
              <TableCell align="left">
                {table.roomName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                経過時間
              </TableCell>
              <TableCell align="left">
                {convertTimeToHM(table.startAt, new Date())}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                合計
              </TableCell>
              <TableCell align="left">
                {table.amount} 円
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleCreateBill}
          disabled={table.validBillExists}
          className={classes.operationButton}
        >
          会計
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleDeleteBill}
          disabled={!table.validBillExists || table.isEnded}
          className={classes.operationButton}
        >
          会計取消
        </Button>
        <Button
          color="primary" 
          variant="contained"
          onClick={handleExit}
          disabled={!table.validBillExists || table.isEnded}
          className={classes.operationButton}
        >
          退店
        </Button>
        <List>
          <ListItem button onClick={handleOpenOrdered}>
            <ListItemText>
              未提供 ({orderedOrder.length} 件)
            </ListItemText>
            {orderedOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={orderedOpen} unmountOnExit>
            <List className={classes.root}>
              {
                orderedOrder.map(
                  detail => (
                    <ModalListItem
                      disabled={disabledDialogButtons}
                      key={`${detail.id}`}
                      detail={detail}
                      handleServed={handleServed}
                      handleCancel={handleCancel}
                      handleOrdered={handleOrdered}
                    />
                  )
                )
              }
            </List>
          </Collapse>
          <ListItem button onClick={handleOpenServed}>
            <ListItemText>
              提供済 ({servedOrder.length} 件)
            </ListItemText>
            {servedOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={servedOpen} unmountOnExit>
            <List className={classes.root} disablePadding>
            {
                servedOrder.map(
                  detail => (
                    <ModalListItem
                      disabled={disabledDialogButtons}
                      key={`${detail.id}`}
                      detail={detail}
                      handleServed={handleServed}
                      handleCancel={handleCancel}
                      handleOrdered={handleOrdered}
                    />
                  )
                )
              }
            </List>
          </Collapse>
          <ListItem button onClick={handleOpenCancelled}>
            <ListItemText>
              キャンセル ({cancelledOrder.length} 件)
            </ListItemText>
            {cancelledOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={cancelledOpen} unmountOnExit>
            <List className={classes.root} disablePadding>
            {
                cancelledOrder.map(
                  detail => (
                    <ModalListItem
                      disabled={disabledDialogButtons}
                      key={`${detail.id}`}
                      detail={detail}
                      handleServed={handleServed}
                      handleCancel={handleCancel}
                      handleOrdered={handleOrdered}
                    />
                  )
                )
              }
            </List>
          </Collapse>
        </List>
      </Container>
    )
  )
}
