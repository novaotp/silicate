
"use client";

// React
import { useEffect, useState } from 'react';

// Internal
import styles from './page.module.scss';
import { fetchMemos } from './server';
import { Memo } from '@/models/memo';

/// -- Components -- ///
import { Meta, AddMemo, View } from './_components';

/** Returns the main component of the notes page. */
export const Memos = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    (async () => {
      const memos = await fetchMemos();

      if (!memos) {
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
