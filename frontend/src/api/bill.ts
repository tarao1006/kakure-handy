import * as base from './base';

export const createBill = async (idToken: string, tableId: string): Promise<any[]> => {
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/bill`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson(res);
}

export const deleteBill = async (idToken: string, tableId: string, billId: string) => {
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/bill/${billId}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson(res);
}
