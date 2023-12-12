
// React
import { useRef, type FormEvent, type RefObject, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/fonts';
import InputField from '../InputField';
import { TextArea } from '../TextArea';
import { CreateSubjectProps, createSubject } from '../../server';
import { reloadPage } from '@/utils/reloadPage';

interface AddSubjectProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
export const AddSubject = ({ dialogRef }: AddSubjectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const gradebookId = useParams().bookId as string;
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      alert("Veuillez renseigner un nom pour votre branche.");
      return;
    }

    const subject: CreateSubjectProps = {
      gradebookId: gradebookId,
      name: name,
      description: description,
    }

    const id = await createSubject(subject);

    if (id === 0) {
      alert("Une erreur est survenue lors de la création de la branche.");
      return;
    }

    setName("");
    setDescription("");
    dialogRef.current!.close();
    reloadPage();
  }

  const closeModal = () => {
    dialogRef.current!.close();
    setName("");
    setDescription("");
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Nom'
          placeholder='Entrez le nom de la branche ici...'
          value={name}
          setValue={setName}
        />
        <TextArea
          label='Description'
          placeholder='Entrez la description de la branche ici...'
          value={description}
          setValue={setDescription}
        />
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} type="submit">Ajouter</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} type="button" onClick={closeModal}>Annuler</button>
        </div>
      </form>
    </dialog>
  )
}
