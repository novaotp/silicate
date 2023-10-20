
'use client';

// Next
import { useRouter } from "next/navigation";

// Internal
import styles from "./index.module.scss";
import { poppins } from "@/fonts";
import { addNoteController } from "@components/note/backend/controllers";
import { clientRoute } from "@shared/utils/routes";

/**
 * Returns a custom button for adding a new note
 * and redirecting to the editing page of said-note.
 */
const NewNote = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const result = await addNoteController({ title: "Ma note", content: "" });

    if (!result.noteId) {
      return router.push(clientRoute.app.notes.use());
    }

    const editingRoute = clientRoute.app.notes.note.edit(result.noteId).use();
    return router.push(editingRoute);
  }

  return (
    <button onClick={handleOnClick} className={`${styles.add} ${poppins.className}`}>
      Ajouter une nouvelle note
    </button>
  )
}

export default NewNote;
