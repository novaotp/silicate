
interface Note {
  /** The id in the database. */
  id: string;
  /** The current title. */
  title: string;
  /** The current content. */
  content: string;
  /** The initial title. */
  initialTitle: string;
  /** The initial content. */
  initialContent: string;
  /** The creation date in milliseconds. */
  created_at: number;
  /** The last update date in milliseconds. */
  updated_at: number;
}

export default Note;
