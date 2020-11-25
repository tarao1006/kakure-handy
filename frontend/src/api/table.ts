import * as base from './base';
import { Table, TableDTO } from '../model';

export const getTables = async (idToken: string): Promise<TableDTO[]> => {
  const res = await fetch(`${base.BACKEND_URL}/table`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson<TableDTO[]>(res);
}

export const getTable = async (idToken: string, id: string): Promise<TableDTO> => {
  const res = await fetch(`${base.BACKEND_URL}/table/${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson<TableDTO>(res);
}

export const exitTable = async (idToken: string, id: string): Promise<TableDTO> => {
  const res = await fetch(`${base.BACKEND_URL}/table/${id}/end`, {
    method: "PUT",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
  })

  return base.ToJson<TableDTO>(res);
}

export const createTable = async (idToken: string, roomId: number): Promise<TableDTO> => {
  console.log(typeof(roomId));
  const res = await fetch(`${base.BACKEND_URL}/table`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin",
    body: JSON.stringify({"room_id": roomId})
  })

  return base.ToJson<TableDTO>(res);
}
