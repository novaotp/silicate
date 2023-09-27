
'use client';

// Internal

/// Styles and fonts
import styles from './index.module.scss';
import { poppins } from '@/core/fonts';

/// Components
import BackLink from "../shared/BackLink";

/// Functions and objects
import useNote from './hooks/useNote';
import { clientRoute } from '@shared/classes/route';

/// Interfaces
import { EditComponentProps } from './interfaces';
import Actions from './classes/actions';

/** Returns the main component of the editing note page. */
const EditComponent = ({ noteId, userID }: EditComponentProps): JSX.Element => {
  const { note: noteData, updateNoteField, isError, isLoading } = useNote(noteId, userID);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  /** The defined note. */
  const note = noteData!;
  const actions = new Actions(note, updateNoteField);

  return (
    <div className={styles.window}>
      <BackLink title="Mes Notes" href={clientRoute.app.notes.use()} />
      <form className={styles.form} method="POST" onSubmit={actions.update}>
        <input
          className={`${styles.title} ${poppins.className}`}
          type="text"
          name="title"
          value={note.title}
          onChange={e => updateNoteField('title', e.currentTarget.value)}
          placeholder="My Note's title..."
        />
        <textarea
          className={`${styles.content} ${poppins.className}`}
          name="content"
          value={note.content}
          onChange={e => updateNoteField('content', e.currentTarget.value)}
          placeholder="My Note's content..."
        />
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancel} ${poppins.className}`}
            type="button"
            onClick={actions.cancel}
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
