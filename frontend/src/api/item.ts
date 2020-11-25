import * as base from './base';
import { Item } from '@model';

export const getItems = async (idToken: string): Promise<Item[]> => {
  const res = await fetch(`${base.BACKEND_URL}/item`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  });

  return base.ToJson<Item[]>(res);
}
