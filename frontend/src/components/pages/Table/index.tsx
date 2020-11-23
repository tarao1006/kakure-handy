import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@atoms';
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
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
);

interface TableParams {
  id: string
}

interface ModalListItemProps {
  order: Order;
  detail: OrderDetail;
  handleServed: (id: number) => void;
  handleCancel: (id: number) => void;
  handleOrdered: (id: number) => void;
}

const ModalListItem: React.FC<ModalListItemProps> = ({order, detail, handleServed, handleCancel, handleOrdered}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const icons = {
    "ordered": <RadioButtonUncheckedIcon />,
    "served": <CheckIcon color="primary" />,
    "cancelled": <ClearIcon color="error" />,
  }

  const topics = {
    "名前": detail.itemName,
    "注文時刻": order.createdAt.toLocaleTimeString(),
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
    }

    return (
      <Button color="primary" onClick={handleClick}>
        提供済みにする
      </Button>
    )
  }

  const CancelButton = () => {
    const handleClick = () => {
      handleCancel(detail.id);
    }

    return (
      <Button color="primary" onClick={handleClick}>
        キャンセルする
      </Button>
    )
  }

  const OrderedButton = () => {
    const handleClick = () => {
      handleOrdered(detail.id);
    }

    return (
      <Button color="primary" onClick={handleClick}>
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
          secondary={`${order.createdAt.toLocaleTimeString()} ${detail.quantity}個`}
          primaryTypographyProps={{ variant: "body2" }}
        />
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        注文編集
      </DialogTitle>
        {
          Object.entries(topics).map(topic => (
            <div key={topic[0]}>
              <div className={classes.topic}>
                <Typography variant="h6">
                  {topic[0]}
                </Typography>
                <Typography variant="body1" className={classes.topicValue}>
                  {topic[1]}
                </Typography>
              </div>
            </div>
          ))
        }
        <DialogActions className={classes.buttons} disableSpacing={true}>
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
  const { id } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();
  const [orderedOrder, setOrderedOrder] = React.useState<OrderDetail[]>();
  const [servedOrder, setServedOrder] = React.useState<OrderDetail[]>();
  const [cancelledOrder, setCancelledOrder] = React.useState<OrderDetail[]>();
  const history = useHistory();

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

  const handleBack = () => {
    history.push('/tables');
  }

  const handleServed = async (id: number) => {
    const token = await currentUser.getIdToken();
    updateOrder(token, table.id, id, 2);
  }

  const handleCancel = async (id: number) => {
    const token = await currentUser.getIdToken();
    updateOrder(token, table.id, id, 3);
  }

  const handleOrdered = async (id: number) => {
    const token = await currentUser.getIdToken();
    updateOrder(token, table.id, id, 1);
  }

  return (
    (table
    ?
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
      <Button color="primary" variant="outlined" onClick={handleCreateBill} disabled={table.validBillExists}>
        会計
      </Button>
      <Button color="secondary" variant="outlined" onClick={handleDeleteBill} disabled={!table.validBillExists || table.isEnded}>
        会計取消
      </Button>
      <Button color="primary" variant="contained" onClick={handleExit} disabled={!table.validBillExists || table.isEnded}>
        退店
      </Button>
      <List className={classes.root}>
        {
            table.orders.map(order => order.details.map(
              detail => (
                <ModalListItem
                  key={`${order.id}${detail.id}`}
                  order={order}
                  detail={detail}
                  handleServed={handleServed}
                  handleCancel={handleCancel}
                  handleOrdered={handleOrdered}
                />
              )
            ))
          }
      </List>
    </Container>
    : <></>)
  )
}
