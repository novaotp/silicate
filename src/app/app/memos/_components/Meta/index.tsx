
"use client";

// React + Next
import { useState, type ChangeEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Internal
import styles from './index.module.scss';
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";
import { poppins } from "@/assets/fonts";

export const Meta = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, set, remove } = useCustomSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch === '') {
      router.push(`${pathname}?${remove('search')}`);
    } else {
      router.push(`${pathname}?${set('search', debouncedSearch)}`);
    }
  }, [debouncedSearch]);

  return (
    <div className={styles.meta}>
      <input
        className={`${styles.search} ${poppins.className}`}
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Cherche un mémo..."
      />
    </div>
  )
}
