
'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Next
import Link from "next/link";

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface HeaderProps {
  /** Deletes the note and redirects to the /app/notes page. */
  destroy: () => void;
}

/** A custom header in the editor. */
export const Header = ({ destroy }: HeaderProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.link}
        href='/app/memos'
      >
        <WestIcon />&nbsp;&nbsp;&nbsp;Mes Mémos
      </Link>
      <button
        className={`${styles.destroy} ${poppins.className}`}
        onClick={destroy}
      >
        <DeleteForeverRoundedIcon />&nbsp;&nbsp;&nbsp;<span className={styles.text}>Supprimer</span>
      </button>
    </div>
  )
}
