import { Order, OrderDTO, convertToOrder } from './order';

export interface Table {
  id: number
  roomName?: string
  startAt?: Date
  isEnded?: boolean
  orders?: Order[]
}

interface tableDTO {
  id: number;
  room_name: string;
  is_ended: boolean;
  start_at: string;
  orders: OrderDTO[];
}

export const convertToTable = (table: tableDTO) => {
  return {
    id: table.id,
    roomName: table.room_name,
    isEnded: table.is_ended,
    startAt: new Date(table.start_at),
    orders: table.orders.map(order => convertToOrder(order)),
  }
}

export const convertToTables = (tables: tableDTO[]) => {
  return tables.map(table => convertToTable(table))
}
