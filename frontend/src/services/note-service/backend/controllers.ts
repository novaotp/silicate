'use server';

import { serverRoute } from "@shared/classes/route";
import { AddNoteProps, AuthResponseProps, ResponseProps, TokenResponseProps } from "@shared/interfaces";
import { cookies } from "next/headers";

async function verifyController(data: { jwt: string }) {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  const result: TokenResponseProps = await response.json();

  return result;
}

export async function addNoteController(data: Pick<AddNoteProps, 'title' | 'content'>): Promise<ResponseProps> {
  const userData: AddNoteProps = {
    ...data,
    userID: (await verifyController({ jwt: cookies().get('id')!.value })).payload.payload.userID
  }

  const url = process.env.API_SERVER_URL + serverRoute.notes.add.use();
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  const result: ResponseProps = await response.json();

  return result;
}