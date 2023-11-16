
'use client';

// React + Next
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { getGrades } from './server';
import { Grade } from '@/models/grade';

/// -- Components -- ///
import { NoGradesFound, RenderGrades } from "./_components";
import { BackLink } from "../../_components";

/** The main component of the grades page. */
export const Grades = () => {
  const params = useParams();
  const router = useRouter();
  const [grades, setGrades] = useState<Grade[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const subjectId = params.subjectId as string;
      const bookId = params.bookId as string;

      const memos = await getGrades(subjectId, bookId);

      if (!memos) {
        router.push('/auth/log-in');
        return;
      }

      setGrades(memos);
    })();
  }, []);

  return (
    <div className={styles.window}>
      <BackLink />
      {grades.length > 0 && <RenderGrades grades={grades} />}
      {grades.length === 0 && <NoGradesFound />}
    </div>
  )
}
