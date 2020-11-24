export interface Bill {
  id: number;
  tableId: number;
  amount: number;
  createdAt: Date;
}

interface billDTO {
  id: number;
  table_id: number;
  amount: number;
  created_at: string;
}

export const convertToBill = (object: billDTO): Bill => {
  return {
    id: object.id,
    tableId: object.table_id,
    amount: object.amount,
    createdAt: new Date(object.created_at),
  }
}
