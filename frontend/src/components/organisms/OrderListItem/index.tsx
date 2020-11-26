import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@atoms';
import { CheckIcon, ClearIcon, RadioButtonUncheckedIcon } from '@icons'
import { OperationDialog } from '@organisms';
import { Order } from '@model';

interface OrderListItemProps {
  disabled: boolean;
  order: Order;
  handleServed: (id: number) => Promise<any>;
  handleCancel: (id: number) => Promise<any>;
  handleOrdered: (id: number) => Promise<any>;
}

export const OrderListItem = ({
  disabled,
  order,
  handleServed,
  handleCancel,
  handleOrdered
}: OrderListItemProps): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const icons = {
    "ordered": <RadioButtonUncheckedIcon />,
    "served": <CheckIcon color="primary" />,
    "cancelled": <ClearIcon color="error" />,
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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
      <OperationDialog
        open={open}
        disabled={disabled}
        order={order}
        handleClose={handleClose}
        handleServed={handleServed}
        handleCancel={handleCancel}
        handleOrdered={handleOrdered}
      />
    </>
  )
}
