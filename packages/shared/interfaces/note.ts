
import { ResponseProps } from "./common";

/**
 * The data of a note :
 * - title : The title of the note
 * - content : The content of the note
 */
interface NoteData {
  /** The title of the note. */
  title: string;
  /** The content of the note. */
  content: string;
}

/** The full data of the note, stored in the database. */
export default interface NoteProps extends NoteData {
  /** The note's id in the database */
  id: number;
  /** The creation date in milliseconds. */
  created_at: number;
  /** The last update date in milliseconds. */
  updated_at: number;
  /** The deletion date in milliseconds (e.g. for temporary recovery by user, for 30 days for example). */
  deleted_at?: number;
}

/** An request interface for creating a note. */
export interface CreateNoteRequestProps extends NoteData { }

/** An response interface for creating a note. */
export interface CreateNoteResponseProps extends ResponseProps {
  /** The id of the newly created note. */
  noteId?: string;
}

/** A response interface for reading a note. */
export interface ReadAllNotesResponseProps extends ResponseProps {
  /** All the user's notes. */
  notes?: NoteProps[];
}

/** A response interface for reading a note. */
export interface ReadNoteResponseProps extends ResponseProps {
  /** The requested note. */
  note?: NoteProps;
}

/** An request interface for updating a note. */

/** A request interface for updating a note. */
export interface UpdateNoteRequestProps extends NoteData { }

/** A response interface for updating a note. */
export interface UpdateNoteResponseProps extends ResponseProps { }

/** A response interface for deleting a note. */
export interface DeleteNoteResponseProps extends ResponseProps { }
