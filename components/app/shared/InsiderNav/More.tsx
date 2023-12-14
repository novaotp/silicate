
"use client";

import { useRef, type ReactNode } from "react";

interface MoreProps {
    icon: ReactNode
}

export const More = ({ icon }: MoreProps) => {
    const menuRef = useRef<HTMLDialogElement>(null);

    const openMenu = () => {
        menuRef.current?.showModal();
    }

    return (
        <>
            <button onClick={openMenu} className={`relative w-10 aspect-square rounded-md flex justify-center items-center text-white`}>
                {icon}
            </button>
            <dialog ref={menuRef} className="relative z-50">

            </dialog>
        </>
    )
}
