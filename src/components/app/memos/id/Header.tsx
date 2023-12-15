
'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Next
import { useRouter } from 'next/navigation'; 

// Internal
import { useAlert } from '@/libs/contexts/AlertContext';
import { useToast } from '@/libs/contexts/ToastContext';
import { revalidate } from './server';

interface HeaderProps {
  /** Deletes the note and redirects to the /app/notes page. */
  destroy: () => Promise<void>,
  unsavedChanges: boolean,
}

/**
 * Renders a custom header for the editing page.
 * 
 * - Come back to the memos page.
 * - Delete the current memo.
 * 
 * In both cases, there will be alerts and toast messages.
 */
export const Header = ({ destroy, unsavedChanges }: HeaderProps): JSX.Element => {
  const { showToast } = useToast();
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleOnLeave = () => {
    if (!unsavedChanges) {
      revalidate('/app/memos');
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
    <header className="relative w-full h-[50px] flex justify-between items-center">
      <button 
        onClick={handleOnLeave} 
        className="relative h-full flex items-center text-black border-b-2 border-black"
      >
        <WestIcon />
        &nbsp;&nbsp;&nbsp;
        <span>Mes Mémos</span>
      </button>
      <button 
        onClick={handleOnDelete} 
        className="relative h-full flex items-center px-3 bg-red-500 rounded-xl text-[14px]"
      >
        <DeleteForeverRoundedIcon className='text-white' />
        &nbsp;&nbsp;&nbsp;
        <span className="text-white">Supprimer</span>
      </button>
    </header>
  )
}
