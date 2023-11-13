
'use client';

// React
import { useRef, useState } from 'react';

// Internal
import styles from './page.module.scss';
import { poppins } from '@/assets/fonts';
import { Gradebook } from "@models/gradebook";
import { NoGradebooksFound, NewGradebook, RenderGradebooks } from "./_components";

/** Returns the main component of the gradebooks page. */
export const Gradebooks = (): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gradebooks, setGradebooks] = useState<Gradebook[]>([]);

  const handleAddGradebook = () => {
    dialogRef.current!.showModal();
  }

  return (
    <div className={styles.wrapper}>
      <NewGradebook dialogRef={dialogRef} />
      {
        gradebooks.length > 0
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
