import * as base from './base';

export const getItems = async (idToken: string): Promise<any[]> => {
  const res = await fetch(`${base.BACKEND_URL}/item`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson(res);
}
