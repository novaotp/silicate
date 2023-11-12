
'use client';

// React
import { useRef } from 'react';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';
import RenderGradebooks, { NoGradebooksFound, NewGradebook } from "./components";
import { GradebookProps } from "@shared/interfaces";

interface GradebooksProps {
  gradebooks: GradebookProps[];
}

/** Returns the main component of the gradebooks page. */
const Gradebooks = ({ gradebooks }: GradebooksProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleAddGradebook = () => {
    dialogRef.current!.showModal();
  }

  return (
    <div className={styles.wrapper}>
      <NewGradebook dialogRef={dialogRef} />
      { gradebooks.length > 0
          ? <RenderGradebooks gradebooks={gradebooks} />
          : <NoGradebooksFound />
      }
      <button
        className={`${styles.add} ${poppins.className}`}
        onClick={handleAddGradebook}
      >
        Ajouter un carnet de note
      </button>
    </div>
  )
}

export default Gradebooks;
