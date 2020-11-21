import * as base from './base';

export const getTables = async (idToken: string): Promise<any[]> => {
  const res = await fetch(`${base.BACKEND_URL}/table`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson(res);
}

export const getTable = async (idToken: string, id: string) => {
  const res = await fetch(`${base.BACKEND_URL}/table/${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson(res);
}

export const exitTable = async (idToken: string, id: string) => {
  const res = await fetch(`${base.BACKEND_URL}/table/${id}/end`, {
    method: "PUT",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson(res);
}
