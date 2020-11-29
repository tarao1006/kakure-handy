import { Item, ItemDTO, convertToItem } from './item';
import { Status } from './status';

export interface Order {
  id: number;
  tableId: number;
  staffId: number;
  quantity: number;
  createdAt: Date;
  item: Item;
  status: Status;
}

export interface OrderDTO {
  id: number;
  table_id: number;
  staff_id: number;
  quantity: number;
  created_at: string;
  item: ItemDTO;
  status: Status;
}

export const convertToOrder = (order: OrderDTO): Order => {
  return {
    id: order.id,
    tableId: order.table_id,
    staffId: order.staff_id,
    quantity: order.quantity,
    createdAt: new Date(order.created_at),
    item: convertToItem(order.item),
    status: order.status
  }
}

export const convertToOrders = (orders: OrderDTO[]): Order[] => {
  return orders.map(order => convertToOrder(order));
}
