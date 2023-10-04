
// Internal
import { NoteProps } from "@shared/interfaces"
import styles from './index.module.scss';
import { NewNote, RenderNotes } from "./components";

/** The {@link NoteComponent}'s props. */
interface NoteComponentProps {
  /** An array of the user's notes. */
  notes: NoteProps[];
}

/** Returns the main component of the notes page. */
const NoteComponent = ({ notes }: NoteComponentProps): JSX.Element => {
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

export default NoteComponent;
