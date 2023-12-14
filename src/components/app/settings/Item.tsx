
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
        <li className={`relative w-full h-[50px] flex justify-center items-center
                       border-t border-x border-gray-400 last-of-type:border-b
                       first-of-type:rounded-t-md last-of-type:rounded-b-md ${className}`}
        >
            <Link href={href} className="relative w-full h-full px-5 flex justify-start items-center">
                {icon}&nbsp;&nbsp;&nbsp;&nbsp;{label}
            </Link>
        </li>
    )
}
