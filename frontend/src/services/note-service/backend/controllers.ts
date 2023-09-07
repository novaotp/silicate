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
  const cookie = cookies().get('id');

  if (!cookie) {
    return { success: false, message: "No cookie <id> found" }
  }

  const tokenResponse = await verifyController({ jwt: cookie.value });

  if (!tokenResponse.success) {
    return { success: tokenResponse.success, message: tokenResponse.message }
  }

  const userData: AddNoteProps = {
    ...data,
    userID: tokenResponse.payload!.payload.userID
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