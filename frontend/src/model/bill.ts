export interface Bill {
  id: number;
  tableId: number;
  amount: number;
  createdAt: Date;
}

export interface BillDTO {
  id: number;
  table_id: number;
  amount: number;
  created_at: string;
}

export const convertToBill = (object: BillDTO): Bill => {
  return {
    id: object.id,
    tableId: object.table_id,
    amount: object.amount,
    createdAt: new Date(object.created_at),
  }
}
