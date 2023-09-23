'use client';

import styles from "./index.module.scss";
import {poppins} from "@core/fonts";
import {addNoteController} from "@/services/note-service/backend/controllers";
import {useRouter} from "next/navigation";
import {clientRoute} from "@shared/classes/route";

export default function NewNote() {
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
