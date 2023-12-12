
"use client";

// React
import { useMemo } from "react";

// Internal
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";
import { Memo } from "@/models/memo";

/// -- Components -- ///
import { Loading } from "@components/shared";
import { Card } from "./Card";
import { useMemos } from "./hooks";

export const MemoList = (): JSX.Element => {
  const { searchParams } = useCustomSearchParams();
  const searchQuery = searchParams!.get('search') ?? '';
  const memos = useMemos();

  const sortedAndFilteredMemos = useMemo(() => {
    if (!memos) return [];

    return memos
      .filter(memo => searchQuery === "" || memo.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((memo1, memo2) => memo2.updated_at.getTime() - memo1.updated_at.getTime());
  }, [memos, searchQuery]);

  const Result = useMemo(() => {
    if (!memos) return <Loading text="Chargement de tes notes..." />;

    if (sortedAndFilteredMemos.length === 0) {
      if (searchQuery === "") return <p>Tu n'as pas encore créé de mémos.</p>;

      return <p>Aucun résultat trouvé pour la recherche.</p>
    }

    return <>{ sortedAndFilteredMemos.map((memo: Memo) => <Card key={memo.id} memo={memo} />) }</>
  }, [sortedAndFilteredMemos]);

  return (
    <ul className="relative w-full max-h-[calc(100%-50px)] mt-5 overflow-y-scroll flex flex-col">
      { Result }
    </ul>
  );
}
