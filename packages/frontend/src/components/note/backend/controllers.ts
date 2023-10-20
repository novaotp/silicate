
import { newServerRoute as serverRoute } from "@shared/utils/routes";
import { CreateNoteRequestProps, CreateNoteResponseProps, DeleteNoteResponseProps, UpdateNoteRequestProps, UpdateNoteResponseProps } from "@shared/interfaces";
import Requests from "@utils/requests";

/**
 * Adds a note in the database.
 * @param data The data for the request.
 */
const addNoteController = async (data: CreateNoteRequestProps): Promise<CreateNoteResponseProps> => {
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.notes.add.client();
  const response = await Requests.noStore.post(url, data);

  return await response.json();
}

/**
 * Updates a note in the database.
 * @param noteId The id of the note to update.
 * @param data The data for the request.
 */
const updateNoteController = async (noteId: string, data: UpdateNoteRequestProps): Promise<UpdateNoteResponseProps> => {
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.notes.update.client(noteId);
  const response = await Requests.noStore.put(url, data);

  return await response.json();
}

/**
 * Deletes a note in the database.
 * @param noteId The id of the note to delete.
 */
const deleteNoteController = async (noteId: string): Promise<DeleteNoteResponseProps> => {
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.notes.update.client(noteId);
  const response = await Requests.noStore.delete(url);

  return await response.json();
}

export { addNoteController, updateNoteController, deleteNoteController };
