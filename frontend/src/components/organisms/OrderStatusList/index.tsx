import React, { useEffect, useState } from 'react';
import { List } from '@atoms';
import { Order } from '@model';
import { OrderStatusListItem } from '@organisms';

interface OrderStatusListProps {
  orders: Order[];
  handleServed: (id: number) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleOrdered: (id: number) => Promise<void>;
}

export const OrderStatusList = ({
  orders,
  handleServed,
  handleCancel,
  handleOrdered
}: OrderStatusListProps): JSX.Element => {
  const [orderedOrders, setOrderedOrders] = useState<Order[]>([]);
  const [servedOrders, setServedOrders] = useState<Order[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);

  useEffect(() => {
    let ordersByStatus = {
      "ordered": [],
      "served": [],
      "cancelled": []
    }
    orders.forEach(order => ordersByStatus[order.status.status].push(order));
    setOrderedOrders(ordersByStatus["ordered"]);
    setServedOrders(ordersByStatus["served"]);
    setCancelledOrders(ordersByStatus["cancelled"]);
  }, [orders]);

  return (
    <List>
      <OrderStatusListItem
        status="未提供"
        orders={orderedOrders}
        handleServed={handleServed}
        handleCancel={handleCancel}
        handleOrdered={handleOrdered}
      />
      <OrderStatusListItem
        status="提供済"
        orders={servedOrders}
        handleServed={handleServed}
        handleCancel={handleCancel}
        handleOrdered={handleOrdered}
      />
      <OrderStatusListItem
        status="キャンセル"
        orders={cancelledOrders}
        handleServed={handleServed}
        handleCancel={handleCancel}
        handleOrdered={handleOrdered}
      />
    </List>
  )
}
