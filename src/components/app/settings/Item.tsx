"use client";

import type { ReactNode } from "react";
import Link from "next/link";

interface ItemProps {
    icon: ReactNode;
    href: string;
    label: string;
    className?: string;
}

/**
 * Renders a link for the settings menu.
 *
 * - Includes an icon.
 */
export const Item = ({ href, icon, label, className }: ItemProps) => {
    return (
        <li
            className={`relative flex h-[50px] w-full items-center justify-center
                       border-x border-t border-gray-400 first-of-type:rounded-t-md
                       last-of-type:rounded-b-md last-of-type:border-b ${className}`}
        >
            <Link
                href={href}
                className='relative flex h-full w-full items-center justify-start px-5'
            >
                {icon}&nbsp;&nbsp;&nbsp;&nbsp;{label}
            </Link>
        </li>
    );
};
