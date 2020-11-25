import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Button,
  CloseIcon,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Table,
  TableBody,
  TableRow,
  TableCell,
  ExpandLess,
  ExpandMore
} from '@atoms';
import { Loading } from '@molecules';
import { AuthContext } from '../../contexts/auth';
import { getTable, exitTable, createBill, deleteBill, updateOrder } from '@api';
import { Table as TableModel, convertToTable, Order } from '@model';
import { convertTimeToHM } from '../../utils';
import { ModalListItem } from './ModalListItem';
import { ConfirmationDialog } from './ConfirmationDialog';

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
  const [orderedOrder, setOrderedOrder] = React.useState<Order[]>([]);
  const [servedOrder, setServedOrder] = React.useState<Order[]>([]);
  const [cancelledOrder, setCancelledOrder] = React.useState<Order[]>([]);
  const [orderedOpen, setOrderedOpen] = React.useState<boolean>(false);
  const [servedOpen, setServedOpen] = React.useState<boolean>(false);
  const [cancelledOpen, setCancelledOpen] = React.useState<boolean>(false);
  const [disabledDialogButtons, setDisabledDialogButtons] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
  const [snackBarTopic, setSnackBarTopic] = React.useState<string>('');
  const [createBillDialogOpen, setCreateBillDialogOpen] = React.useState<boolean>(false);
  const [deleteBillDialogOpen, setDeleteBillDialogOpen] = React.useState<boolean>(false);
  const [exitDialogOpen, setExitDialogOpen] = React.useState<boolean>(false);
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

    let ordered: Order[] = [];
    let served: Order[] = [];
    let cancelled: Order[] = [];
    t.orders.forEach(order => {
      if (order.status.status === "ordered") {
        ordered.push(order);
      } else if (order.status.status === "served") {
        served.push(order);
      } else if (order.status.status === "cancelled") {
        cancelled.push(order);
      }
    })
    setOrderedOrder(ordered);
    setServedOrder(served);
    setCancelledOrder(cancelled);

    if (ordered.length !== 0) {
      setOrderedOpen(true);
    }
  }

  const confirmCreateBill = () => {
    setCreateBillDialogOpen(true);
  }

  const confirmDeleteBill = () => {
    setDeleteBillDialogOpen(true);
  }

  const confirmExit = () => {
    setExitDialogOpen(true);
  }

  const handleCreateBill = async (ok: boolean) => {
    setCreateBillDialogOpen(false);

    if (ok) {
      const token = await currentUser.getIdToken();
      await createBill(token, tableId);
      await updateTable(token);

      setSnackBarOpen(true);
      setSnackBarTopic('会計');
    }
  }

  const handleDeleteBill = async (ok: boolean) => {
    setDeleteBillDialogOpen(false);

    if (ok) {
      const token = await currentUser.getIdToken();
      await deleteBill(token, tableId, `${table.billId}`);
      await updateTable(token);

      setSnackBarOpen(true);
      setSnackBarTopic('会計取消');
    }
  }

  const handleExit = async (ok: boolean) => {
    setExitDialogOpen(false);

    if (ok) {
      const token = await currentUser.getIdToken();
      await exitTable(token, tableId);
      await updateTable(token);

      setSnackBarOpen(true);
      setSnackBarTopic('退店');
    }
  }

  const handleBack = () => {
    history.push('/');
  }

  const handleServed = async (id: number) => {
    setSnackBarTopic('提供済にする');
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 2);
    await updateTable(token);
    setDisabledDialogButtons(false);
    handleSnackBarOpen();
  }

  const handleCancel = async (id: number) => {
    setSnackBarTopic('キャンセルする');
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 3);
    await updateTable(token);
    setDisabledDialogButtons(false);
    handleSnackBarOpen();
  }

  const handleOrdered = async (id: number) => {
    setSnackBarTopic('注文済に戻す');
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 1);
    await updateTable(token);
    setDisabledDialogButtons(false);
    handleSnackBarOpen();
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

  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  }

  const handleSnackBarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  }

  return (
    isLoading
    ? (<Loading />)
    :
    (
      <Container component="main" maxWidth="xs" className={classes.root}>
        {
          isLoading && <Loading />
        }
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                部屋
              </TableCell>
              <TableCell align="left">
                {table.room.name}
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
          onClick={confirmCreateBill}
          disabled={table.validBillExists()}
          className={classes.operationButton}
        >
          会計
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={confirmDeleteBill}
          disabled={!table.validBillExists() || table.isEnded}
          className={classes.operationButton}
        >
          会計取消
        </Button>
        <Button
          color="primary" 
          variant="contained"
          onClick={confirmExit}
          disabled={!table.validBillExists() || table.isEnded}
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
                  order => (
                    <ModalListItem
                      disabled={disabledDialogButtons}
                      key={`${order.id}`}
                      order={order}
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
                  order => (
                    <ModalListItem
                      disabled={disabledDialogButtons}
                      key={`${order.id}`}
                      order={order}
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
                  order => (
                    <ModalListItem
                      disabled={disabledDialogButtons}
                      key={`${order.id}`}
                      order={order}
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
        <ConfirmationDialog
          open={createBillDialogOpen}
          onClose={handleCreateBill}
          topic='会計'
        />
        <ConfirmationDialog
          open={deleteBillDialogOpen}
          onClose={handleDeleteBill}
          topic='会計取消'
        />
        <ConfirmationDialog
          open={exitDialogOpen}
          onClose={handleExit}
          topic='退店'
          subTopic='退店処理は取り消せません。'
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackBarOpen}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
          message={`${snackBarTopic} 処理を完了しました。`}
          action={
            <>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Container>
    )
  )
}
