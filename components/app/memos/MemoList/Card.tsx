
"use client";

// Next
import Link from "next/link";

// Internal
import { Memo } from "@/models/memo";
import { formattedDate } from "./Card.utils";

interface CardProps {
  memo: Memo;
}

/**
 * Renders a memo card with the given data.
 * 
 * - On click, redirects to the editing page for the memo.
 */
export const Card = ({ memo }: CardProps): JSX.Element => {
  const href = `/app/memos/${memo.id}`;

  return (
    <li className="relative w-full min-h-[80px] rounded-xl mb-3 last-of-type:mb-0">
      <Link
        href={href}
        className="relative w-full h-full p-3 flex flex-col bg-blue-200"
      >
        <div className="relative w-full flex justify-between">
          <p>{memo.title}</p>
          <p>{formattedDate(memo.updated_at)}</p>
        </div>
        <p className="relative whitespace-nowrap overflow-hidden text-ellipsis mt-2 text-xs bg-gray-500">
          {memo.content}
        </p>
      </Link>
    </li>
  )
}
