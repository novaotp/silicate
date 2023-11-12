
'use client';

// React + Next
import { type FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Internal

/// -- Styles and fonts --
import styles from './page.module.scss';
import { poppins } from '@/assets/fonts';

/// -- Components --
import { Header, Editor, Title, Actions } from './components';

/// -- Functions and objects --
import { Memo } from '@/models/memo';
import { fetchMemo, updateMemo, deleteMemo } from './server';
import { Loading } from '@/app/_components/Loading';

/** Returns the main component of the editing note page. */
export const Edit = (): JSX.Element => {
  const router = useRouter();
  const memoId = Number(useParams().id as string);
  const [memo, setMemo] = useState<Memo | undefined>(undefined);
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

    const response = await updateMemo(memo!.id, title, content);

    if (response) {
      setMemo({
        ...memo!,
        title: title,
        content: content,
        updated_at: new Date(),
      });
    }
  }

  /** Deletes the note and redirects to the /app/notes page. */
  const destroy = async (): Promise<void> => {
    await deleteMemo(memo!.id);
    router.push('/app/memos');
  }

  /** Discards the changes and sets the values to their initial ones. */
  const discard = (): void => {
    setTitle(memo!.title);
    setContent(memo!.content);
  }

  return (
    <div className={styles.window}>
      {
        !memo
          ? <Loading text="Chargement du mémo..." />
          : <>
              <Header destroy={() => destroy()}></Header>
              <form className={styles.form} onSubmit={handleUpdate}>
                <Title title={title} updateTitle={setTitle} />
                <Editor content={content} updateContent={setContent} />
                <Actions discard={discard} disabled={title === "" || content === "" || (memo.title === title && memo.content === content)} />
              </form>
            </>
      }
    </div>
  )
}
