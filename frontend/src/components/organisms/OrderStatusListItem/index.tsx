import React, { useState } from 'react';
import { Collapse, ListItem, ListItemText } from '@atoms';
import { ExpandLess, ExpandMore } from '@icons';
import { OrderList } from '@organisms';
import { Order } from '@model';

interface OrderStatusListItemProps {
  disabled: boolean;
  status: string;
  orders: Order[];
  handleServed: (id: number) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleOrdered: (id: number) => Promise<void>;
}

export const OrderStatusListItem = ({
  disabled,
  status,
  orders,
  handleServed,
  handleCancel,
  handleOrdered
}: OrderStatusListItemProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
      <>
        <ListItem button onClick={handleClick}>
          <ListItemText>
            {status} ({orders.length} 件)
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} unmountOnExit>
          <OrderList
            disabled={disabled}
            orders={orders}
            handleServed={handleServed}
            handleCancel={handleCancel}
            handleOrdered={handleOrdered}
          />
        </Collapse>
      </>
  )
}
