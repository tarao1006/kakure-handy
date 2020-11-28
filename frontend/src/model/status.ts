export const ORDER_STATUS_ORDERED = 1;
export const ORDER_STATUS_SERVED = 2;
export const ORDER_STATUS_CANCELLED = 3;

export interface Status {
  id: number;
  status: string;
}
