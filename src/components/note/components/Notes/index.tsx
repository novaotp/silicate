
"use client";

// Internal
import styles from './index.module.scss';
import { NewNote, RenderNotes } from "./components";
import fetchNotes from './fetchNotes';
import Loading from '@components/shared/Loading';

/** Returns the main component of the notes page. */
const Notes = (): JSX.Element => {
  const { notes: notesData, isError, isLoading } = fetchNotes();

  if (isError) return <p>An error occurred while fetching the data...</p>
  if (isLoading) return <Loading text="Chargement de vos notes..." />

  const notes = notesData!;

  return (
    <div className={styles.window}>
      <div className={styles.view}>
        {notes.length === 0 && <p>On dirait que tu n'as pas encore ajouté de notes !</p>}
        {notes.length != 0 && <RenderNotes notes={notes} />}
      </div>
      <NewNote />
    </div>
  )
}

export default Notes;
