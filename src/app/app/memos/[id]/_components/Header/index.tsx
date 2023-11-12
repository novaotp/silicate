
'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Next
import { useRouter } from 'next/navigation'; 

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface HeaderProps {
  /** Deletes the note and redirects to the /app/notes page. */
  destroy: () => void,
  unsavedChanges: boolean,
}

/** A custom header in the editor. */
export const Header = ({ destroy, unsavedChanges }: HeaderProps): JSX.Element => {
  const router = useRouter();

  const handleOnLeave = () => {
    if (unsavedChanges && !window.confirm("Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter?")) {
      return;
    }

    router.push('/app/memos');
  }

  const handleOnDelete = () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce mémo ?")) {
      return;
    }

    destroy();
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handleOnLeave} className={`${styles.link} ${poppins.className}`}>
        <WestIcon />&nbsp;&nbsp;&nbsp;Mes Mémos
      </button>
      <button onClick={handleOnDelete} className={`${styles.destroy} ${poppins.className}`}>
        <DeleteForeverRoundedIcon />&nbsp;&nbsp;&nbsp;<span className={styles.text}>Supprimer</span>
      </button>
    </div>
  )
}
