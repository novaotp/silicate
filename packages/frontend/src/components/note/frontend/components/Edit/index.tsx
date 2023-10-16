
'use client';

// Internal

/// Styles and fonts
import styles from './index.module.scss';
import { poppins } from '@/fonts';

/// Components
import BackLink from "../shared/BackLink";

/// Functions and objects
import useNote from './hooks/useNote';
import { clientRoute } from '@shared/classes/routes';
import Editor from './components/Editor';
import { usePathname } from 'next/navigation';
import { updateNoteController } from '@/components/note/backend/controllers';
import ResponseProps, { EditNoteProps } from '@shared/interfaces';
import { FormEvent } from 'react';

interface EditProps {
  /** The user's id. */
  userID: number;
}

const getNoteId = (): string => {
  return usePathname().split('/').pop()!;
}

/** Returns the main component of the editing note page. */
const Edit = ({ userID }: EditProps): JSX.Element => {
  const { note: noteData, updateNoteField, isError, isLoading } = useNote({ noteId: getNoteId(), userID });

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  /** The defined note. */
  const note = noteData!;

  /** Updates the note on the form's submit. */
  const update = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const data: Pick<EditNoteProps, 'id' | "title" | "content"> = {
      id: note.id,
      title: note.title,
      content: note.content
    }

    const response: ResponseProps = await updateNoteController(data);

    if (response.success) {
      updateNoteField('initialTitle', note.title);
      updateNoteField('initialContent', note.content);
    }
  }

  /** Discards the changes and sets the values to their initial ones. */
  const discard = (): void => {
    updateNoteField('title', note.initialTitle);
    updateNoteField('content', note.initialContent);
  }

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

export default Edit;
