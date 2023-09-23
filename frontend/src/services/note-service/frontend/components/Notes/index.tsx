import { NoteProps } from "@shared/interfaces"
import styles from './index.module.scss';
import NewNote from "./components/NewNote";
import RenderNotes from "@/services/note-service/frontend/components/Notes/components/RenderNotes";

interface NoteComponentProps {
  notes: NoteProps[];
}

export default function NoteComponent({ notes }: NoteComponentProps) {
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
