
'use client';

// Next
import { useRouter } from "next/navigation";

// Internal
import styles from "./index.module.scss";
import { poppins } from "@/assets/fonts";
import { createMemo } from "../../server";

/**
 * Custom button for adding a new note and
 * redirecting to the editing page of said-note.
 */
export const AddMemo = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const noteId = await createMemo("Ma note", "");

    if (!noteId) {
      router.push('/app/memos');
      return;
    }

    router.push(`/app/memos/${noteId}`);
  }

  return (
    <button id="add-memo" onClick={handleOnClick} className={`${styles.add} ${poppins.className}`}>
      Ajouter un nouveau mémo
    </button>
  )
}
