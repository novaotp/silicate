
"use client";

// React + Next
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Internal
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";

export const Meta = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, set, remove } = useCustomSearchParams();
  const [search, setSearch] = useState<string>(searchParams!.get('search') ?? '');
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
    <div className="relative w-full h-auto flex flex-col justify-between">
      <input
        className="relative w-full h-[50px] rounded-lg border border-gray-400 px-4"
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Cherche un mémo..."
      />
    </div>
  )
}
