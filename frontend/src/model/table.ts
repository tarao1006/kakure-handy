import { TransferWithinAStation } from '@material-ui/icons';
import { Order, OrderDTO, convertToOrders } from './order';
import { Room } from './room';

export class Table {
  id: number;
  isReserved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  startAt: Date;
  endAt: Date;
  amount: number;
  billId: number;
  room: Room;
  orders: Order[];

  constructor(
    id: number,
    isReserved: boolean,
    isStarted: boolean,
    isEnded: boolean,
    startAt: Date,
    endAt: Date,
    amount: number,
    billId: number,
    room: Room,
    orders: Order[]
  ) {
    this.id = id;
    this.isReserved = isReserved;
    this.isStarted = isStarted;
    this.isEnded = isEnded;
    this.startAt = startAt;
    this.endAt = endAt;
    this.amount = amount;
    this.billId = billId;
    this.room = room;
    this.orders = orders;
  }

  validBillExists = (): boolean => {
    return this.billId !== 0;
  }
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
  return new Table(
    table.id,
    table.is_reserved,
    table.is_started,
    table.is_ended,
    new Date(table.start_at),
    new Date(table.end_at),
    table.amount,
    table.bill_id,
    table.room,
    convertToOrders(table.orders),
  )
}

export const convertToTables = (tables: TableDTO[]) => {
  return tables.map(table => convertToTable(table))
}
