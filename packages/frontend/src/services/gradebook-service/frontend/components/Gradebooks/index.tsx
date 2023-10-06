'use client';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';

// Internal
import { GradebookProps } from "@shared/interfaces";
import { NoGradebooksFound, RenderGradebooks } from "./components";
import styles from './index.module.scss';
import { useEffect, useRef } from 'react';
import InputField from '../shared/InputField';

interface GradebookComponentProps {
  gradebooks: GradebookProps[];
}

export default function GradebooksComponent({ gradebooks }: GradebookComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
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

  const handleAddGradebook = () => {
    dialogRef.current!.showModal();
  }

  const closeModal = () => {
    dialogRef.current!.close();
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <dialog className={styles.dialog} ref={dialogRef}>
        <button onClick={closeModal}>Close</button>
        <form action="">
          <InputField
            type='text'
            label='Nom du gradebook'
            name='name'
            placeholder='Entrez le nom du gradebook ici...'
          />
          <button onClick={closeModal} type="submit">Ajouter</button>
        </form>
      </dialog>
      {gradebooks.length > 0 && <RenderGradebooks gradebooks={gradebooks} />}
      {gradebooks.length === 0 && <NoGradebooksFound />}
      <button className={styles.add} ref={buttonRef} onClick={handleAddGradebook}><AddIcon /></button>
    </div>
  )
}