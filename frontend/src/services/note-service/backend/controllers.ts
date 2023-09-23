'use server';

import {serverRoute} from "@shared/classes/route";
import {AddNoteProps, EditNoteProps, NoteProps, ResponseProps, TokenResponseProps} from "@shared/interfaces";
import VerifyToken from "@core/controllers/verifyToken";

async function newNote(userData: AddNoteProps): Promise<ResponseProps & { noteId?: number }> {
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
  return await response.json();
}

export async function addNoteController(
  data: Pick<AddNoteProps, 'title' | 'content'>
): Promise<ResponseProps & {
  noteId?: number
}> {
  const validation: TokenResponseProps = await VerifyToken.validation();

  if (!validation.success) {
    return validation;
  }

  const userData: AddNoteProps = {
    ...data,
    userID: validation.payload!.payload.userID
  }

  return await newNote(userData);
}

async function updateNote(userData: EditNoteProps): Promise<ResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.notes.edit.use();
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  return await response.json();
}

export async function updateNoteController(data: NoteProps): Promise<ResponseProps> {
  const validation: TokenResponseProps = await VerifyToken.validation();

  if (!validation.success) {
    return validation;
  }

  const userData: EditNoteProps = {
    ...data,
    userID: validation.payload!.payload.userID
  }

  return await updateNote(userData);
}
