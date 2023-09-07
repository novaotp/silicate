import { NoteProps } from "@shared/interfaces"
import styles from './index.module.scss';
import { poppins } from "@/core/fonts";
import { clientRoute } from "@shared/classes/route";
import Link from "next/link";

interface NoteComponentProps {
  notes: NoteProps[];
}

export default function NoteComponent({ notes }: NoteComponentProps) {
  return (
    <div className={styles.window}>
      <div className={styles.view}>
        {notes.length === 0 && <p>On dirait que tu n'as pas encore ajouté de notes !</p>}
      </div>
      <Link href={clientRoute.app.notes.add.use()} className={styles.add}>Ajouter une nouvelle note</Link>
    </div>
  )
}