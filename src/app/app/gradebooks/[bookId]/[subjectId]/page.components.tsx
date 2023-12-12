
'use client';

// React + Next
import { useEffect, useRef, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

// Internal
import styles from './page.module.scss';
import { getGrades } from './server';
import { Grade } from '@/models/grade';

/// -- Components -- ///
import { BackLink } from "../../_components";
import { poppins } from '@/fonts';
import { Meta, AddGrade, View, AverageGrade } from './_components';

/** The main component of the grades page. */
export const Grades = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [grades, setGrades] = useState<Grade[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const subjectId = params.subjectId as string;

      const grades = await getGrades(subjectId);

      if (!grades) {
        router.push(pathname.split('/').slice(0, -1).join('/'));
        return;
      }

      setGrades(grades);
    })();
  }, []);

  const handleAddGrade = () => {
    dialogRef.current!.showModal();
  }

  return (
    <div className={styles.window}>
      <BackLink />
      <AddGrade dialogRef={dialogRef} />
      <Meta />
      <View grades={grades} />
      <AverageGrade grades={grades} />
      <button
        className={`${styles.add} ${poppins.className}`}
        onClick={handleAddGrade}
      >
        Ajouter une note
      </button>
    </div>
  )
}
