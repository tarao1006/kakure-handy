import * as base from './base';

const status_kind = {
  1: "ordered",
  2: "served",
  3: "cancelled"
}

export const updateOrder = async (idToken: string, tableId: number, orderDetailId: number, statusId: number) => {
  const status = {
    "Status": status_kind[statusId],
    "status_id": statusId
  }
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/order/${orderDetailId}`, {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: 'same-origin',
    body: JSON.stringify(status)
  });

  return res.status;
}

export const cancelOrder = async (idToken: string, tableId: number, orderDetailId: number) => {
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/order/${orderDetailId}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: 'same-origin',
  });

  return res.status;
}
