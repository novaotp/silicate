"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemProps {
    icon: ReactNode;
    href: string;
}

/** Renders an icon for the navbar. */
export const Item = ({ href, icon }: ItemProps) => {
    const colors =
        usePathname() === href
            ? "bg-white text-purple-600 dark:text-blue-500"
            : "bg-transparent text-white";

    return (
        <Link
            href={href}
            className={`relative flex aspect-square w-10 items-center justify-center rounded-md ${colors}`}
        >
            {icon}
        </Link>
    );
};
