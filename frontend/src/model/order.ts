export interface OrderDetail {
  id: number;
  orderId: number;
  itemName: string;
  price: number;
  quantity: number;
  status: string;
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

export const convertToOrderDetail = (object: OrderDetailDTO) => {
  return {
    id: object.id,
    orderId: object.order_id,
    itemName: object.item_name,
    price: object.price,
    quantity: object.quantity,
    status: object.status,
  }
}

export const convertToOrder = (object: OrderDTO) => {
  return {
    id: object.id,
    tableId: object.table_id,
    staffId: object.staff_id,
    createdAt: new Date(object.created_at),
    details: object.details.map(detail => convertToOrderDetail(detail)),
  }
}
