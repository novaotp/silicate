
'use client';

// Internal

/// Styles and fonts
import styles from './index.module.scss';
import { poppins } from '@/core/fonts';

/// Components
import BackLink from "../shared/BackLink";

/// Functions and objects
import useNote from './hooks/useNote';
import useActions from './hooks/useActions';
import { clientRoute } from '@shared/classes/routes';
import Editor from './components/Editor';

interface EditComponentProps {
  /** The note's id. */
  noteId: string;
  /** The user's id. */
  userID: number;
}

/** Returns the main component of the editing note page. */
const EditComponent = ({ noteId, userID }: EditComponentProps): JSX.Element => {
  const { note: noteData, updateNoteField, isError, isLoading } = useNote({ noteId, userID });

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  /** The defined note. */
  const note = noteData!;
  const { update, discard } = useActions({ note, updateNoteField });

  return (
    <div className={styles.window}>
      <BackLink title="Mes Notes" href={clientRoute.app.notes.use()} />
      <form className={styles.form} method="POST" onSubmit={update}>
        <input
          className={`${styles.title} ${poppins.className}`}
          type="text"
          name="title"
          value={note.title}
          onChange={e => updateNoteField('title', e.currentTarget.value)}
          placeholder="My Note's title..."
        />
        <div className={styles.content}>
          <Editor note={note} updateNoteField={updateNoteField} />
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancel} ${poppins.className}`}
            type="button"
            onClick={discard}
            disabled={note.title === note.initialTitle && note.content === note.initialContent}
          >
            Cancel
          </button>
          <button
            className={`${styles.button} ${styles.save} ${poppins.className}`}
            type="submit"
            disabled={note.title === note.initialTitle && note.content === note.initialContent}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditComponent;
