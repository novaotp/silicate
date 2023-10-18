
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
  const getMonth = (date: Date): string => date.toLocaleString('fr-CH', { month: 'long' }).slice(0, 3).toUpperCase();
  const getDay = (date: Date): string => date.toLocaleString('fr-CH', { day: "2-digit" });

  return (
    <ul className={styles.wrapper}>
      {
        notes.map(note => {
          const href = clientRoute.app.notes.note.edit(note.id).use();
          const updatedAt = new Date(Number(note.updated_at));

          return (
            <li key={note.id} className={styles.note}>
              <Link className={styles.link} href={href}>
                <div className={styles.updatedAt}>
                  <p>{getMonth(updatedAt)}</p>
                  <p>{getDay(updatedAt)}</p>
                </div>
                <div className={styles.data}>{note.title}</div>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

export default RenderNotes;
