
export interface Note {
  /** The id in the database. */
  id: number,
  /** The id of the user who created the note. */
  user_id: number,
  /** The title. */
  title: string,
  /** The content. */
  content: string,
  /** When it was created in `milliseconds`. */
  created_at: string,
  /** When it was last updated in `milliseconds`. */
  updated_at: string,
  /** When it was deleted in `milliseconds`. */
  deleted_at: string | undefined
}
