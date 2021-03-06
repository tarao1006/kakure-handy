import React from 'react';
import { List } from '@atoms';
import { OrderListItem } from '@organisms';
import { Order } from '@model';

interface OrderListProps {
  disabled: boolean;
  orders: Order[];
  handleServed: (id: number) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleOrdered: (id: number) => Promise<void>;
}

export const OrderList = ({
  disabled,
  orders,
  handleServed,
  handleCancel,
  handleOrdered
}: OrderListProps): JSX.Element => {

  return (
    <List>
      {
        orders.map(order => (
          <OrderListItem
            disabled={disabled}
            key={`${order.id}`}
            order={order}
            handleServed={handleServed}
            handleCancel={handleCancel}
            handleOrdered={handleOrdered}
          />
        ))
      }
    </List>
  )
}
