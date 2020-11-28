import * as base from '../base';

export const getAvailableRoom = async (idToken: string): Promise<number[]> => {
  const res = await fetch(`${base.BACKEND_URL}/room/available`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: 'same-origin'
  });

  return base.ToJson<number[]>(res);
}
