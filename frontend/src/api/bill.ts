import * as base from './base';
import { Bill } from '@model';

export const createBill = async (idToken: string, tableId: string): Promise<Bill> => {
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/bill`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  });

  return base.ToJson(res);
}

export const deleteBill = async (idToken: string, tableId: string, billId: string): Promise<{}> => {
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/bill/${billId}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  });

  return base.ToJson<{}>(res);
}
