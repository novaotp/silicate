
'use client';

// Next
import Link from "next/link";

// Internal
import styles from './index.module.scss';
import { clientRoute } from "@shared/utils/routes";
import { NoteProps } from "@shared/interfaces";

/** The {@link RenderNotes}'s props. */
interface RenderNotesProps {
  /** An array of the user's notes. */
  notes: NoteProps[];
}

/** Returns an unordered list of the notes. */
const RenderNotes = ({ notes }: RenderNotesProps): JSX.Element => {
  return (
    <ul className={styles.wrapper}>
      {
        notes.map(note => {
          const href = clientRoute.app.notes.note.edit(note.id).use();

          return (
            <li key={note.id} className={styles.note}>
              <Link className={styles.link} href={href}>
                {note.title}
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

export default RenderNotes;
