export interface OrderDetail {
  id: number;
  orderId: number;
  itemName: string;
  price: number;
  quantity: number;
  status: string;
  createdAt: Date;
}

export interface Order {
  id: number;
  tableId: number;
  staffId: number;
  createdAt: Date;
  details: OrderDetail[];
}

export interface OrderDetailDTO {
  id: number;
  order_id: number;
  item_name: string;
  price: number;
  quantity: number;
  status: string;
}

export interface OrderDTO {
  id: number;
  table_id: number;
  staff_id: number;
  created_at: string;
  details: OrderDetailDTO[];
}

export const convertToOrderDetail = (object: OrderDetailDTO, date: Date): OrderDetail => {
  return {
    id: object.id,
    orderId: object.order_id,
    itemName: object.item_name,
    price: object.price,
    quantity: object.quantity,
    status: object.status,
    createdAt: date,
  }
}

export const convertToOrder = (object: OrderDTO): Order => {
  return {
    id: object.id,
    tableId: object.table_id,
    staffId: object.staff_id,
    createdAt: new Date(object.created_at),
    details: object.details.map(detail => convertToOrderDetail(detail, new Date(object.created_at))),
  }
}
