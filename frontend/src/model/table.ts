import { Order, OrderDTO, convertToOrder } from './order';

export interface Table {
  id: number
  roomName?: string
  isEnded?: boolean
  startAt?: Date
  endAt?: Date
  amount?: number
  billCnt?: number
  latestBillId?: number
  orders?: Order[]
}

interface tableDTO {
  id: number;
  room_name: string;
  is_ended: boolean;
  start_at: string;
  end_at: string;
  amount: number,
  bill_cnt: number,
  latest_bill_id: number,
  orders: OrderDTO[];
}

export const convertToTable = (table: tableDTO): Table => {
  return {
    id: table.id,
    roomName: table.room_name,
    isEnded: table.is_ended,
    startAt: new Date(table.start_at),
    endAt: new Date(table.end_at),
    amount: table.amount,
    billCnt: table.bill_cnt,
    latestBillId: table.latest_bill_id,
    orders: table.orders.map(order => convertToOrder(order)),
  }
}

export const convertToTables = (tables: tableDTO[]) => {
  return tables.map(table => convertToTable(table))
}
