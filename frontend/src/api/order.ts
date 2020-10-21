import * as base from './base';
import { Item } from '../model';

export const createOrder = async (idToken: string, tableId: number, items: Item[]) => {
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
    body: JSON.stringify({
      details
    })
  });

  return base.ToJson(res);
}
