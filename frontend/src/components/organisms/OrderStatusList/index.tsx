import React, { useEffect, useState } from 'react';
import { List } from '@atoms';
import { Loading, FolderListItem } from '@molecules';
import { OrderList } from '@organisms';
import { Order } from '@model';

interface OrderStatusListProps {
  disabled: boolean;
  orders: Order[];
  handleServed: (id: number) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleOrdered: (id: number) => Promise<void>;
}

export const OrderStatusList = ({
  disabled,
  orders,
  handleServed,
  handleCancel,
  handleOrdered
}: OrderStatusListProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderedOrders, setOrderedOrders] = useState<Order[]>([]);
  const [servedOrders, setServedOrders] = useState<Order[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);
  const [courseOrders, setCourseOrders] = useState<Order[]>();

  useEffect(() => {
    let ordersByStatus = {
      "ordered": [],
      "served": [],
      "cancelled": [],
      "course": []
    }
    orders.forEach(order => {
      if (order.item.isCourse() && order.status.status === "ordered") {
        ordersByStatus["course"].push(order);
      } else {
        ordersByStatus[order.status.status].push(order);
      }
    });
    setOrderedOrders(ordersByStatus["ordered"]);
    setServedOrders(ordersByStatus["served"]);
    setCancelledOrders(ordersByStatus["cancelled"]);
    setCourseOrders(ordersByStatus["course"]);
    setIsLoading(false);
  }, [orders]);

  return (
    <>
      {isLoading && <Loading />}
      {
        !isLoading && (
          <List>
            <FolderListItem
              title={`未提供 (${orderedOrders.length} 件)`}
              collapsedContent={
                <OrderList
                  disabled={disabled}
                  orders={orderedOrders}
                  handleServed={handleServed}
                  handleCancel={handleCancel}
                  handleOrdered={handleOrdered}
                />
              }
              collapsed={orderedOrders.length === 0}
            />
            <FolderListItem
              title={`コース (${courseOrders.length} 件)`}
              collapsedContent={
                <OrderList
                  disabled={disabled}
                  orders={courseOrders}
                  handleServed={handleServed}
                  handleCancel={handleCancel}
                  handleOrdered={handleOrdered}
                />
              }
            />
            <FolderListItem
              title={`提供済 (${servedOrders.length} 件)`}
              collapsedContent={
                <OrderList
                  disabled={disabled}
                  orders={servedOrders}
                  handleServed={handleServed}
                  handleCancel={handleCancel}
                  handleOrdered={handleOrdered}
                />
              }
            />
            <FolderListItem
              title={`キャンセル (${cancelledOrders.length} 件)`}
              collapsedContent={
                <OrderList
                  disabled={disabled}
                  orders={cancelledOrders}
                  handleServed={handleServed}
                  handleCancel={handleCancel}
                  handleOrdered={handleOrdered}
                />
              }
            />
          </List>
        )
      }
    </>
  )
}
