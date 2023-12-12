
"use client";

// React
import { useEffect, useState } from "react";

// Internal
import { getMemos } from "./server";
import { Memo } from "@/models/memo";

/**
 * A client-side hook to get all the user's memos from the database.
 * @returns An array of {@link Memo | `Memo`} objects or `undefined`.
 */
export const useMemos = () => {
  const [memos, setMemos] = useState<Memo[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const memos = await getMemos();

      if (!memos) {
        console.error("Unable to load memos.");
        return;
      }

      setMemos(memos);
    })();
  }, []);

  return memos;
}
