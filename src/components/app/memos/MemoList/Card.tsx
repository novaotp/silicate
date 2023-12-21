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
        <li className='relative mb-3 min-h-[80px] w-full rounded-xl last-of-type:mb-0'>
            <Link
                href={href}
                className='relative flex h-full w-full flex-col bg-blue-200 p-3'
            >
                <div className='relative flex w-full justify-between'>
                    <p>{memo.title}</p>
                    <p>{formattedDate(memo.updated_at)}</p>
                </div>
                <p className='relative mt-2 overflow-hidden text-ellipsis whitespace-nowrap bg-gray-500 text-xs'>
                    {memo.content}
                </p>
            </Link>
        </li>
    );
};
