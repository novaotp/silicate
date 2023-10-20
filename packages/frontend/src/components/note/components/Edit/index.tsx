
'use client';

// React + Next
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Internal

/// -- Styles and fonts --
import styles from './index.module.scss';
import { poppins } from '@/fonts';

/// -- Components --
import Editor from './components/Editor';
import BackLink from "../shared/BackLink";

/// -- Functions and objects --
import useNote from './hooks/useNote';
import { clientRoute } from '@shared/utils/routes';
import { deleteNoteController, updateNoteController } from '@components/note/controllers';
import { UpdateNoteRequestProps } from '@shared/interfaces';

/** Returns the main component of the editing note page. */
const Edit = (): JSX.Element => {
  const router = useRouter();
  const { note: noteData, updateNoteField, isError, isLoading } = useNote();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  /** The defined note. */
  const note = noteData!;

  /** Updates the note on the form's submit. */
  const update = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const data: UpdateNoteRequestProps = {
      title: note.title,
      content: note.content
    }

    const response = await updateNoteController(note.id.toString(), data);

    if (response.success) {
      updateNoteField('initialTitle', note.title);
      updateNoteField('initialContent', note.content);
    }
  }

  /** Deletes the note and redirects to the /app/notes page. */
  const destroy = async (): Promise<void> => {
    const response = await deleteNoteController(note.id.toString());

    if (!response.success) {
      return alert(response.message);
    }

    return router.push(clientRoute.app.notes.use());
  }

  /** Discards the changes and sets the values to their initial ones. */
  const discard = (): void => {
    updateNoteField('title', note.initialTitle);
    updateNoteField('content', note.initialContent);
  }

  return (
    <div className={styles.window}>
      <BackLink title="Mes Notes" href={clientRoute.app.notes.use()} />
      <button onClick={destroy}>Delete</button>
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
