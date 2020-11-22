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
import { getTable, exitTable, createBill, deleteBill } from '@api';
import { Table as TableModel, convertToTable } from '../../../model';
import { convertTimeToHM } from '../../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflowX: "auto",
    },
  })
);

interface TableParams {
  id: string
}

export const TableDetail = () => {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);
  const { id } = useParams<TableParams>();
  const [table, setTable] = React.useState<TableModel | undefined>();
  const history = useHistory();
  const icons = {
    "ordered": <RadioButtonUncheckedIcon />,
    "served": <CheckIcon color="primary" />,
    "cancelled": <ClearIcon color="error" />,
  }

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

  return (
    (table
    ?
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Button
        color="inherit"
        component="a"
        onClick={handleBack} startIcon={<ArrowBackIcon />}
        style={{ backgroundColor: 'transparent' }}
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
                <ListItem key={`${order.id}${detail.id}`} button component="a">
                  <ListItemIcon>
                  {icons[detail.status]}
                  </ListItemIcon>
                  <ListItemText
                    primary={detail.itemName}
                    secondary={`${order.createdAt.toLocaleTimeString()} ${detail.quantity}個`}
                    primaryTypographyProps={{ variant: "body2" }}
                    style={{whiteSpace: "nowrap"}}
                  />
                </ListItem>)
            ))
          }
      </List>
    </Container>
    : <></>)
  )
}
