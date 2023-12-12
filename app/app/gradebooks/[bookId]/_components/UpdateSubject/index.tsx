
// React
import { useRef, type FormEvent, type RefObject, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/fonts';
import InputField from '../InputField';
import { TextArea } from '../TextArea';
import { CreateSubjectProps, UpdateSubjectProps, createSubject, deleteSubject, updateSubject } from '../../server';
import { reloadPage } from '@/utils/reloadPage';
import { Subject } from '@/models/subject';
import { useToast } from '@/libs/contexts/ToastContext';
import { useAlert } from '@/libs/contexts/AlertContext';

interface UpdateSubjectProps2 {
  subject: Subject,
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
export const UpdateSubject = ({ subject, dialogRef }: UpdateSubjectProps2) => {
  const { showToast } = useToast();
  const { showAlert } = useAlert();
  const params = useParams();
  const gradebookId = useParams()!.bookId as string;
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>(subject.name);
  const [description, setDescription] = useState<string>(subject.description);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      alert("Veuillez renseigner un nom pour votre branche.");
      return;
    }

    const subjectUpdate: UpdateSubjectProps = {
      gradebookId: gradebookId,
      subjectId: subject.id.toString(),
      name: name,
      description: description,
    }

    const success = await updateSubject(subjectUpdate);

    if (!success) {
      showToast("Une erreur est survenue lors de la création de la branche.", "error");
      return;
    }

    dialogRef.current!.close();
    reloadPage();
  }

  const closeModal = () => {
    if (name === subject.name && description === subject.description) {
      dialogRef.current!.close();
      return;
    }

    showAlert(
      "Vous avez des changements non sauvegardés. Êtes-vous sûr d'abandonner ?",
      () => function() {
        setName(subject.name);
        setDescription(subject.description);
        dialogRef.current!.close();
      },
      () => {}
    );
  }

  const handleDelete = () => {
    showAlert(
      "Êtes-vous sûr de supprimer cette branche ? Vous perdrez les notes associées.",
      () => async function() {
        dialogRef.current!.close();
        await deleteSubject(subject.id.toString(), params!.bookId as string);
        reloadPage();
      },
      () => {}
    );
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <button className={`${styles.delete} ${poppins.className}`} onClick={handleDelete}>Delete</button>
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
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} type="submit">Modifier</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} type="button" onClick={closeModal}>Annuler</button>
        </div>
      </form>
    </dialog>
  )
}
