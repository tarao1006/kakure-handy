import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CloseIcon,
} from '@atoms';
import { Order } from '@model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(2),
      color: theme.palette.grey[500],
      padding: 0,
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
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
);

interface ModalListItemProps {
  disabled: boolean;
  order: Order;
  handleServed: (id: number) => Promise<any>;
  handleCancel: (id: number) => Promise<any>;
  handleOrdered: (id: number) => Promise<any>;
}

export const ModalListItem = ({
  disabled,
  order,
  handleServed,
  handleCancel,
  handleOrdered
}: ModalListItemProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const icons = {
    "ordered": <RadioButtonUncheckedIcon />,
    "served": <CheckIcon color="primary" />,
    "cancelled": <ClearIcon color="error" />,
  }

  const disables = {
    "ordered": order.status.status === "served" || order.status.status === "ordered",
    "served": order.status.status === "served" || order.status.status === "cancelled",
    "cancelled": order.status.status === "served" || order.status.status === "cancelled"
  }

  const topics = {
    "名前": order.item.name,
    "注文時刻": order.createdAt.toLocaleTimeString(),
    "個数": order.quantity,
    "状態": order.status.status,
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const ServedButton = () => {
    const handleClick = async () => {
      await handleServed(order.id);
    }

    return (
      <Button disabled={disabled || disables["served"]} color="primary" onClick={handleClick}>
        提供済みにする
      </Button>
    )
  }

  const CancelButton = () => {
    const handleClick = async () => {
      await handleCancel(order.id);
    }

    return (
      <Button disabled={disabled || disables["cancelled"]} color="primary" onClick={handleClick}>
        キャンセルする
      </Button>
    )
  }

  const OrderedButton = () => {
    const handleClick = async () => {
      await handleOrdered(order.id);
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
          {icons[order.status.status]}
        </ListItemIcon>
        <ListItemText
          primary={order.item.name}
          secondary={`${order.createdAt.toLocaleTimeString()} ${order.quantity}個`}
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
