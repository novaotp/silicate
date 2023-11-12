
"use client";

// React + Next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './page.module.scss';
import { fetchMemos } from './server';
import { Memo } from '@/models/memo';

/// -- Components -- ///
import { Meta, AddMemo, View } from './_components';

/** Returns the main component of the notes page. */
export const Memos = (): JSX.Element => {
  const router = useRouter();
  const [memos, setMemos] = useState<Memo[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const memos = await fetchMemos();

      if (!memos) {
        router.push('/auth/log-in');
        return;
      }

      setMemos(memos);
    })();
  }, []);

  return (
    <div className={styles.window}>
      <Meta />
      <View memos={memos} />
      <AddMemo />
    </div>
  )
}
