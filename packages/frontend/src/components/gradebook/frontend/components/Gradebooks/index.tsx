
'use client';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';

// React
import { FormEvent, useEffect, useRef } from 'react';

// Internal
import { GradebookProps } from "@shared/interfaces";
import { NoGradebooksFound, RenderGradebooks } from "./components";
import styles from './index.module.scss';
import InputField from '../shared/InputField';
import { poppins } from '@/core/fonts';

interface GradebooksProps {
  gradebooks: GradebookProps[];
}

/** Returns the main component of the gradebooks page. */
const Gradebooks = ({ gradebooks }: GradebooksProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const { offsetWidth, offsetHeight } = wrapperRef.current;
      const button = buttonRef.current!;

      const offset = Math.min(offsetWidth, offsetHeight) * 0.05;
      button.style.bottom = `${offset}px`;
      button.style.right = `${offset}px`;
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  const handleAddGradebook = () => {
    dialogRef.current!.showModal();
  }

  const closeModal = () => {
    dialogRef.current!.close();
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <dialog className={styles.dialog} ref={dialogRef}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <InputField
            type='text'
            label='Nom du gradebook'
            name='name'
            placeholder='Entrez le nom du gradebook ici...'
          />
          <InputField
            type="date"
            label="Début"
            name="startDate"
            placeholder="Entrez la date de début ici..."
          />
          <InputField
            type="date"
            label="Fin"
            name="endDate"
            placeholder="Entrez la date de fin ici..."
          />
          <div className={styles.buttons}>
            <button className={`${styles.add} ${styles.button} ${poppins.className}`} onClick={closeModal} type="submit">Ajouter</button>
            <button className={`${styles.close} ${styles.button} ${poppins.className}`} onClick={closeModal}>Close</button>
          </div>
        </form>
      </dialog>
      {gradebooks.length > 0 && <RenderGradebooks gradebooks={gradebooks} />}
      {gradebooks.length === 0 && <NoGradebooksFound />}
      <button className={styles.add} ref={buttonRef} onClick={handleAddGradebook}><AddIcon /></button>
    </div>
  )
}

export default Gradebooks;
