
// React
import { useRef, type FormEvent, type RefObject, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/fonts';
import InputField from '../InputField';
import { TextArea } from '../TextArea';
import { CreateGradeProps, createGrade } from '../../server';
import { reloadPage } from '@/utils/reloadPage';

interface AddGradeProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
export const AddGrade = ({ dialogRef }: AddGradeProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [weight, setWeight] = useState<number>(1);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      alert("Veuillez renseigner un nom pour votre note.");
      return;
    }

    const subject: CreateGradeProps = {
      subjectId: params.subjectId as string,
      name: name,
      score: score,
      weight: weight,
      comment: comment,
    }

    const success = await createGrade(subject);

    if (!success) {
      alert("Une erreur est survenue lors de la création de la note.");
      return;
    }

    setName("");
    setScore("");
    setWeight(1);
    setComment("");
    dialogRef.current!.close();
    reloadPage();
  }

  const closeModal = () => {
    dialogRef.current!.close();
    setName("");
    setScore("");
    setWeight(1);
    setComment("");
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Nom'
          placeholder={'Entrez le titre de l\'examen ici...'}
          value={name}
          setValue={setName}
        />
        <InputField
          type='number'
          label='Score'
          placeholder={'Entrez le résultat de l\'examen ici...'}
          value={score}
          setValue={setScore}
        />
        <InputField
          type='text'
          label='Poids'
          placeholder={'Entrez le poids de l\'examen ici...'}
          value={weight}
          setValue={setWeight}
        />
        <TextArea
          label='Commentaire'
          placeholder='Entrez un commentaire ici...'
          value={comment}
          setValue={setComment}
        />
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} type="submit">Ajouter</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} type="button" onClick={closeModal}>Annuler</button>
        </div>
      </form>
    </dialog>
  )
}
