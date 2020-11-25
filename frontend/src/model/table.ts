import { Order, OrderDTO, convertToOrders } from './order';
import { Room } from './room';

export interface Table {
  id: number;
  isReserved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  startAt: Date;
  endAt: Date;
  amount: number;
  billId: number;
  room: Room;
  orders: Order[]
}

export interface TableDTO {
  id: number;
  is_reserved: boolean;
  is_started: boolean;
  is_ended: boolean;
  start_at: string;
  end_at: string;
  amount: number,
  bill_id: number;
  room: Room;
  orders: OrderDTO[];
}

export const convertToTable = (table: TableDTO): Table => {
  return {
    id: table.id,
    isReserved: table.is_reserved,
    isStarted: table.is_started,
    isEnded: table.is_ended,
    startAt: new Date(table.start_at),
    endAt: new Date(table.end_at),
    amount: table.amount,
    billId: table.bill_id,
    room: table.room,
    orders: convertToOrders(table.orders),
  }
}

export const convertToTables = (tables: TableDTO[]) => {
  return tables.map(table => convertToTable(table))
}
