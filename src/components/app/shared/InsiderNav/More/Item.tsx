
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

interface ItemProps {
    icon: ReactNode;
    href: string;
    label: string;
    onClick: () => void;
}

/**
 * Renders a link for the main menu.
 * 
 * - Includes an icon.
 */
export const Item = ({ onClick, href, icon, label }: ItemProps) => {
    return (
        <li className="relative w-full h-[50px] flex justify-center items-center
                       border-t border-x border-gray-400 last-of-type:border-b
                       first-of-type:rounded-t-md last-of-type:rounded-b-md"
        >
            <Link onClick={onClick} href={href} className="relative w-full h-full px-5 flex justify-start items-center">
                {icon}&nbsp;&nbsp;&nbsp;&nbsp;{label}
            </Link>
        </li>
    )
}
