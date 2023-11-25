
"use client";

// React
import { useMemo } from "react";

// Internal
import styles from "./index.module.scss";
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";

/// -- Components -- ///
import { Loading } from "@/app/_components/Loading";
import { EmptyView } from "./_components";
import { useFilteredAndSorted } from "@/libs/hooks/useFilteredAndSorted";

interface ViewProps {
  items: any[] | undefined,
  loadingText: string;
  emptyViewText: string;
  CardComponent: React.FC<{ item: any; }>;
}

export const View = ({ items, loadingText, emptyViewText, CardComponent }: ViewProps): JSX.Element => {
  return (
    <ul className={styles.notes}>
      {
        !items
          ? <Loading text={loadingText} />
          : items.length === 0
            ? <EmptyView isSearchQueryEmpty={searchQuery === ""} emptyViewText={emptyViewText} />
            : items.map((item: any) => <CardComponent key={item.id} item={item} />)
      }
    </ul>
  );
}
