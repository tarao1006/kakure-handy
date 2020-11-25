import * as base from './base';
import { Item, Order } from '@model';

export const createOrder = async (idToken: string, tableId: number, items: Item[]): Promise<Item[]> => {
  const details = items.map(item => ({
    "item_id": item.id,
    "quantity": item.count
  }));

  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/order`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: 'same-origin',
    body: JSON.stringify(details)
  });

  return base.ToJson<Item[]>(res);
}

export const updateOrder = async (idToken: string, tableId: number, orderDetailId: number, statusId: number): Promise<Order> => {
  const res = await fetch(`${base.BACKEND_URL}/table/${tableId}/order/${orderDetailId}`, {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: 'same-origin',
    body: JSON.stringify({"status_id": statusId})
  });

  return base.ToJson<Order>(res);
}
