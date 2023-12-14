
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
    const colors = usePathname() === href ? "bg-white text-purple-600" : "bg-transparent text-white";

    return (
        <Link href={href} className={`relative w-10 aspect-square rounded-md flex justify-center items-center ${colors}`}>
            {icon}
        </Link>
    )
}
