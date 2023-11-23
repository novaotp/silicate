
"use client";

// React
import { useEffect, useMemo, useRef } from "react";

// Internal
import styles from "./index.module.scss";
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";
import { Memo } from "@/models/memo";

/// -- Components -- ///
import { Loading } from "@/app/_components/Loading";
import { EmptyView, MemoCard } from "./_components";

interface ViewProps {
  memos: Memo[] | undefined,
}

export const View = ({ memos }: ViewProps): JSX.Element => {
  const notesRef = useRef<HTMLUListElement>(null);
  const { searchParams } = useCustomSearchParams();
  const searchQuery = searchParams!.get('search') ?? '';
  
  useEffect(() => {
    const notesElement = notesRef.current!;

    const handleScroll = () => {
      const isBottom = notesElement.scrollHeight - notesElement.scrollTop === notesElement.clientHeight;

      if (isBottom) {
        notesElement.classList.add('no-shadow');
      } else {
        notesElement.classList.remove('no-shadow');
      }
    };

    notesElement.addEventListener('scroll', handleScroll);

    return () => {
      notesElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const sortedAndFilteredMemos = useMemo(() => {
    if (!memos) return [];

    return memos
      .filter(memo => searchQuery === "" || memo.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((memo1, memo2) => memo2.updated_at.getTime() - memo1.updated_at.getTime());
  }, [memos, searchQuery]);

  return (
    <ul className={styles.notes} ref={notesRef}>
      {
        !memos
          ? <Loading text="Chargement de tes notes..." />
          : sortedAndFilteredMemos.length === 0
            ? <EmptyView isSearchQueryEmpty={searchQuery === ""} />
            : sortedAndFilteredMemos.map((memo: Memo) => <MemoCard key={memo.id} memo={memo} />)
      }
    </ul>
  );
}
