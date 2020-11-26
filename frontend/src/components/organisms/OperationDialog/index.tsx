import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@atoms';
import { CloseIcon } from '@icons';
import { OrderDialogContent, OrderDialogOperationButton } from '@molecules';
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
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
);

interface OperationDialogProps {
  open: boolean;
  disabled: boolean;
  order: Order;
  handleClose: () => void;
  handleServed: (id: number) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleOrdered: (id: number) => Promise<void>;
}

export const OperationDialog = ({
  open,
  disabled,
  order,
  handleClose,
  handleServed,
  handleCancel,
  handleOrdered
}: OperationDialogProps): JSX.Element => {
  const classes = useStyles();

  const disables = {
    "ordered": order.status.status === "served" || order.status.status === "ordered",
    "served": order.status.status === "served" || order.status.status === "cancelled",
    "cancelled": order.status.status === "served" || order.status.status === "cancelled"
  }

  return (
    <Dialog
      fullWidth
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
        <OrderDialogContent topic="名前" value={order.item.name} />
        <OrderDialogContent topic="注文時刻" value={order.createdAt.toLocaleTimeString()} />
        <OrderDialogContent topic="個数" value={order.quantity} />
        <OrderDialogContent topic="状態" value={order.status.status} />
      </DialogContent>
      <DialogActions className={classes.dialogButtons} disableSpacing={true}>
        <OrderDialogOperationButton
          operation="提供済にする"
          disabled={disabled || disables["served"]}
          id={order.id}
          onClick={handleServed}
        />
        <OrderDialogOperationButton
          operation="キャンセルする"
          disabled={disabled || disables["cancelled"]}
          id={order.id}
          onClick={handleCancel}
        />
        <OrderDialogOperationButton
          operation="注文済に戻す"
          disabled={disabled || disables["ordered"]}
          id={order.id}
          onClick={handleOrdered}
        />
      </DialogActions>
    </Dialog>
  )
}