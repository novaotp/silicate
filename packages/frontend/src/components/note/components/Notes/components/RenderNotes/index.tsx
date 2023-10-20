
'use client';

// MUI Icons
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

// Next
import Link from "next/link";

// Internal
import styles from './index.module.scss';
import { clientRoute } from "@shared/utils/routes";
import { NoteProps } from "@shared/interfaces";
import { useState } from "react";

/** The {@link RenderNotes}'s props. */
interface RenderNotesProps {
  /** An array of the user's notes. */
  notes: NoteProps[];
}

/** Renders a list of notes. */
const RenderNotes = ({ notes }: RenderNotesProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const sortedNotes = [...notes].sort((a, b) => {
    if (filter === 'Oldest to newest') {
      return a.updated_at - b.updated_at;
    }
    // Default to sorting newest to oldest
    return b.updated_at - a.updated_at;
  });

  const getMonth = (date: Date): string => date.toLocaleString('fr-CH', { month: 'long' }).slice(0, 3).toUpperCase();
  const getDay = (date: Date): string => date.toLocaleString('fr-CH', { day: "2-digit" });

  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <input
          className={styles.search}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search note/s..."
        />
        <button
          className={styles.dropbtn}
          onClick={() => setShowFilter(!showFilter)}
        >
          <TuneRoundedIcon />
        </button>
      </div>
      <div className={`${styles.dropdown} ${showFilter ? styles.active : ""}`}>
        <button className={styles.filter} onClick={() => setFilter("Newest to oldest")}>Du plus récent au plus ancien</button>
        <button className={styles.filter} onClick={() => setFilter("Oldest to newest")}>Du plus ancien au plus récent</button>
      </div>
      <ul className={styles.notes}>
        {
          sortedNotes.map(note => {
            if (search !== "" && !note.title.toLowerCase().includes(search.toLowerCase())) {
              return;
            }

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
    </div>
  )
}

export default RenderNotes;
