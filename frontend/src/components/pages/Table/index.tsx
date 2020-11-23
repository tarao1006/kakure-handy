import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CloseIcon,
  ExpandLess,
  ExpandMore
} from '@atoms';
import { Loading } from '@molecules';
import { AuthContext } from '../../../contexts/auth';
import { getTable, exitTable, createBill, deleteBill, updateOrder } from '@api';
import { Table as TableModel, convertToTable, Order, OrderDetail } from '../../../model';
import { convertTimeToHM } from '../../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflowX: "auto",
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(2),
      color: theme.palette.grey[500],
      padding: 0,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    topic: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    topicValue: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      textAlign: 'center',
    },
    operationButton: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
);

interface TableParams {
  tableId: string
}

interface ModalListItemProps {
  disabled: boolean;
  detail: OrderDetail;
  handleServed: (id: number) => void;
  handleCancel: (id: number) => void;
  handleOrdered: (id: number) => void;
}

const ModalListItem: React.FC<ModalListItemProps> = ({disabled, detail, handleServed, handleCancel, handleOrdered}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const icons = {
    "ordered": <RadioButtonUncheckedIcon />,
    "served": <CheckIcon color="primary" />,
    "cancelled": <ClearIcon color="error" />,
  }

  const disables = {
    "ordered": detail.status === "served" || detail.status === "ordered",
    "served": detail.status === "served" || detail.status === "cancelled",
    "cancelled": detail.status === "served" || detail.status === "cancelled"
  }

  const topics = {
    "名前": detail.itemName,
    "注文時刻": detail.createdAt.toLocaleTimeString(),
    "個数": detail.quantity,
    "状態": detail.status,
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const ServedButton = () => {
    const handleClick = () => {
      handleServed(detail.id);
      handleClose();
    }

    return (
      <Button disabled={disabled || disables["served"]} color="primary" onClick={handleClick}>
        提供済みにする
      </Button>
    )
  }

  const CancelButton = () => {
    const handleClick = () => {
      handleCancel(detail.id);
      handleClose();
    }

    return (
      <Button disabled={disabled || disables["cancelled"]} color="primary" onClick={handleClick}>
        キャンセルする
      </Button>
    )
  }

  const OrderedButton = () => {
    const handleClick = () => {
      handleOrdered(detail.id);
      handleClose();
    }

    return (
      <Button disabled={disabled || disables["ordered"]} color="primary" onClick={handleClick}>
        注文済みに戻す
      </Button>
    )
  }

  return (
    <>
      <ListItem button component="a" onClick={handleOpen}>
        <ListItemIcon>
          {icons[detail.status]}
        </ListItemIcon>
        <ListItemText
          primary={detail.itemName}
          secondary={`${detail.createdAt.toLocaleTimeString()} ${detail.quantity}個`}
          primaryTypographyProps={{ variant: "body2" }}
        />
      </ListItem>
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography>
            注文編集
          </Typography>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {
            Object.entries(topics).map(topic => (
              <div key={topic[0]}>
                <Typography variant="body1">
                  {topic[0]}
                </Typography>
                <Typography variant="body1" className={classes.topicValue}>
                  {topic[1]}
                </Typography>
              </div>
            ))
          }
        </DialogContent>
        <DialogActions className={classes.dialogButtons} disableSpacing={true}>
          <ServedButton />
          <CancelButton />
          <OrderedButton />
        </DialogActions>
      </Dialog>
    </>
  )
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    setIsLoading(true);
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 2);
    await updateTable(token);
    setDisabledDialogButtons(false);
    setIsLoading(false);
  }

  const handleCancel = async (id: number) => {
    setIsLoading(true);
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 3);
    await updateTable(token);
    setDisabledDialogButtons(false);
    setIsLoading(false);
  }

  const handleOrdered = async (id: number) => {
    setIsLoading(true);
    setDisabledDialogButtons(true);
    const token = await currentUser.getIdToken();
    await updateOrder(token, table.id, id, 1);
    await updateTable(token);
    setDisabledDialogButtons(false);
    setIsLoading(false);
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
    (table
    ?
    <Container component="main" maxWidth="xs" className={classes.root}>
      {
        isLoading && <Loading />
      }
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
    : <></>)
  )
}
