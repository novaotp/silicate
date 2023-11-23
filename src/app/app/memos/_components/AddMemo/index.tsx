
'use client';

// Next
import { useRouter } from "next/navigation";

// Internal
import styles from "./index.module.scss";
import { poppins } from "@/assets/fonts";
import { createMemo } from "../../server";
import { useToast } from "@/libs/contexts/ToastContext";

/**
 * Custom button for adding a new note and
 * redirecting to the editing page of said-note.
 */
export const AddMemo = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const handleOnClick = async () => {
    const noteId = await createMemo("Mon mémo", "");

    if (!noteId) {
      showToast('Une erreur est survenue lors de la création de votre mémo. Veuillez réessayer ultérieurement.', 'error')
      return;
    }

    showToast('Votre mémo a été créé avec succès.', 'success')
    router.push(`/app/memos/${noteId}`);
  }

  return (
    <button id="add-memo" onClick={handleOnClick} className={`${styles.add} ${poppins.className}`}>
      Ajouter un nouveau mémo
    </button>
  )
}
