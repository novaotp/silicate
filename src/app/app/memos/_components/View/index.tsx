
"use client";

// React + Next
import { useCallback } from "react";
import Link from "next/link";

// Internal
import styles from "./index.module.scss";
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";
import { Memo } from "@/models/memo";
import { Loading } from "@/app/_components/Loading";

interface ViewProps {
  memos: Memo[] | undefined,
}

export const View = ({ memos }: ViewProps): JSX.Element => {
  const { searchParams } = useCustomSearchParams();

  const getMonth = (date: Date): string => date.toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase();
  const getDay = (date: Date): string => date.toLocaleString('default', { day: "2-digit" });

  const sortMemos = useCallback((memos: Memo[]) => {
    return memos.sort((memo1: Memo, memo2: Memo) => memo2.updated_at.getTime() - memo1.updated_at.getTime());
  }, [memos]);

  return (
    <ul className={styles.notes}>
      {
        !memos
        ? <Loading text="Chargement de tes notes..." />
        : memos.length === 0
          ? <p>On dirait que tu n'as pas encore ajouté de mémos !</p>
          : 
            (
              sortMemos(memos).map((memo: Memo) => {
                const searchQuery = searchParams.get('search') ?? '';

                if (searchQuery !== "" && !memo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return;
                }

                return (
                  <li key={memo.id} className={styles.note}>
                    <Link className={styles.link} href={`/app/memos/${memo.id}`}>
                      <div className={styles.updatedAt}>
                        <p>{getMonth(memo.updated_at)}</p>
                        <p>{getDay(memo.updated_at)}</p>
                      </div>
                      <div className={styles.data}>{memo.title}</div>
                    </Link>
                  </li>
                )
              })
            )
      }
    </ul>
  )
}
