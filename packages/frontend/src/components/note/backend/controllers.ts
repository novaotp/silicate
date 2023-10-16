
'use server';

import { serverRoute } from "@shared/classes/routes";
import ResponseProps, { AddNoteProps, EditNoteProps } from "@shared/interfaces";
import useVerifyToken from "@hooks/useVerifyToken";
import Requests from "@utils/requests";

const addNoteController = async (data: Pick<AddNoteProps, 'title' | 'content'>): Promise<ResponseProps & { noteId?: number }> => {
  const { success, result } = await useVerifyToken();

  if (!success) {
    return result as ResponseProps;
  }

  const userData: AddNoteProps = {
    ...data,
    userID: result.payload!.payload.userID
  }

  const url = process.env.API_SERVER_URL + serverRoute.notes.add.use();
  
  const response = await Requests.noStorePost(url, userData);
  return await response.json();
}

const updateNoteController = async (data: Pick<EditNoteProps, 'id' | "title" | "content">): Promise<ResponseProps> => {
  const { success, result } = await useVerifyToken();

  if (!success) {
    return result as ResponseProps;
  }

  const userData: Omit<EditNoteProps, "created_at" | "updated_at"> = {
    ...data,
    userID: result.payload!.payload.userID
  }

  const url = process.env.API_SERVER_URL + serverRoute.notes.update.use();

  const response = await Requests.noStorePost(url, userData);
  return await response.json();
}

export { addNoteController, updateNoteController };
