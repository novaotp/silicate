
'use client';

// React + Next
import { type FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Internal

/// -- Styles and fonts --
import styles from './page.module.scss';
import { poppins } from '@/assets/fonts';

/// -- Components --
import { Header, Editor } from './components';

/// -- Functions and objects --
import { Memo } from '@/models/memo';
import { fetchMemo, updateMemo, deleteMemo } from './server';

/** Returns the main component of the editing note page. */
export const Edit = (): JSX.Element => {
  const router = useRouter();
  const memoId = Number(useParams().id as string);
  const [memo, setMemo] = useState<Memo>({} as Memo);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      const fetchedMemo = await fetchMemo(memoId);

      if (!fetchedMemo) {
        router.push('/app/memos');
        return;
      }

      setMemo(fetchedMemo);
      setTitle(fetchedMemo.title);
      setContent(fetchedMemo.content);
    })();
  }, []);

  /** Updates the note on the form's submit. */
  const handleUpdate = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const response = await updateMemo(memo.id, title, content);

    if (response) {
      setMemo({
        ...memo,
        title: title,
        content: content,
      });
    }
  }

  /** Deletes the note and redirects to the /app/notes page. */
  const destroy = async (): Promise<void> => {
    await deleteMemo(memo.id);
    router.push('/app/memos');
  }

  /** Discards the changes and sets the values to their initial ones. */
  const discard = (): void => {
    setTitle(memo.title);
    setContent(memo.content);
  }

  return (
    <div className={styles.window}>
      <Header destroy={() => destroy()}></Header>
      <form className={styles.form} onSubmit={handleUpdate}>
        <input
          className={`${styles.title} ${poppins.className}`}
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="My memo's title..."
        />
        <div className={styles.content}>
          <Editor content={content} updateContent={setContent} />
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancel} ${poppins.className}`}
            type="button"
            onClick={discard}
            disabled={memo.title === title && memo.content === content}
          >
            Annuler
          </button>
          <button
            className={`${styles.button} ${styles.save} ${poppins.className}`}
            type="submit"
            disabled={memo.title === title && memo.content === content}
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  )
}
