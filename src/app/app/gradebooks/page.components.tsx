
'use client';

// React + Next
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import { fetchGradebooks } from './server';
import { Gradebook } from "@models/gradebook";

/// -- Styles and Fonts -- ///
import styles from './page.module.scss';
import { poppins } from '@/assets/fonts';

/// -- Components -- ///
import { NoGradebooksFound, AddGradebook, RenderGradebooks, View, Meta } from "./_components";

/** Returns the main component of the gradebooks page. */
export const Gradebooks = (): JSX.Element => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gradebooks, setGradebooks] = useState<Gradebook[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const gradebooks = await fetchGradebooks();

      if (!gradebooks) {
        router.push('/auth/log-in');
        return;
      }

      setGradebooks(gradebooks);
    })();
  }, []);

  const handleAddGradebook = () => {
    dialogRef.current!.showModal();
  }

  return (
    <div className={styles.wrapper}>
      <Meta />
      <View gradebooks={gradebooks} />
      <button
        className={`${styles.add} ${poppins.className}`}
        onClick={handleAddGradebook}
      >
        Ajouter un carnet de note
      </button>
      <AddGradebook dialogRef={dialogRef} />
    </div>
  )
}
