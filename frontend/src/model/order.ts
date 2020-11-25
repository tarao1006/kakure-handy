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

export const convertToOrder = (object: OrderDTO): Order => {
  return {
    id: object.id,
    tableId: object.table_id,
    staffId: object.staff_id,
    quantity: object.quantity,
    createdAt: new Date(object.created_at),
    item: convertToItem(object.item),
    status: object.status
  }
}

export const convertToOrders = (orders: OrderDTO[]): Order[] => {
  return orders.map(order => convertToOrder(order));
}
