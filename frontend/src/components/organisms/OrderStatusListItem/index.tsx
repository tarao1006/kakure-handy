import React, { useState } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@atoms';
import {
  ExpandLess,
  ExpandMore
} from '@icons';
import { Order } from '@model';
import { OrderListItem } from '@organisms';

interface OrderStatusListItemProps {
  status: string;
  orders: Order[];
  handleServed: (id: number) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleOrdered: (id: number) => Promise<void>;
}

export const OrderStatusListItem = ({
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
          <List>
            {
              orders.map(
                order => (
                  <OrderListItem
                    disabled={false}
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
      </>
  )
}
