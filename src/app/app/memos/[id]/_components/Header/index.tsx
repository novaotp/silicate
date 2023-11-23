
'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Next
import { useRouter } from 'next/navigation'; 

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';
import { useAlert } from '@/libs/contexts/AlertContext';
import { useToast } from '@/libs/contexts/ToastContext';

interface HeaderProps {
  /** Deletes the note and redirects to the /app/notes page. */
  destroy: () => Promise<void>,
  unsavedChanges: boolean,
}

/** A custom header in the editor. */
export const Header = ({ destroy, unsavedChanges }: HeaderProps): JSX.Element => {
  const { showToast } = useToast();
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleOnLeave = () => {
    if (!unsavedChanges) {
      router.push('/app/memos');
      return;
    }

    showAlert(
      "Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter?",
      () => function() {
        showToast("Mémo inchangé.", "info")
        router.push('/app/memos')
      },
      () => {}
    );
  }

  const handleOnDelete = () => {
    showAlert(
      "Êtes-vous sûr de vouloir supprimer ce mémo ?",
      () => async function() {
        await destroy();
        showToast("Mémo supprimé avec succès.", "success")
      },
      () => {}
    );
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
