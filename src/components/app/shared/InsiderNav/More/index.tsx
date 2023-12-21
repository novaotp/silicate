"use client";

// MUI Icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

// React
import { useRef, type ReactNode } from "react";

// Internal
import { Item } from "./Item";

interface MoreProps {
    icon: ReactNode;
}

/**
 * Renders a button to show the full menu.
 *
 * - A dialog box to show the full menu
 * - Can close the menu on the top-right corner of the box
 * - Links to others pages, with proper icons
 */
export const More = ({ icon }: MoreProps) => {
    const menuRef = useRef<HTMLDialogElement>(null);

    const openMenu = () => {
        menuRef.current?.showModal();
    };

    const closeMenu = () => {
        menuRef.current?.close();
    };

    return (
        <>
            <button
                onClick={openMenu}
                className={`relative flex aspect-square w-10 items-center justify-center rounded-md text-white`}
            >
                {icon}
            </button>
            <dialog
                ref={menuRef}
                className='fixed z-50 m-auto w-full rounded-md p-5 shadow-2xl'
            >
                <header className='relative mb-5 flex h-10 w-full items-center justify-between'>
                    <h2 className='text-2xl'>Menu</h2>
                    <button
                        onClick={closeMenu}
                        className='relative aspect-square h-full'
                    >
                        <CloseRoundedIcon />
                    </button>
                </header>
                <menu>
                    <Item
                        onClick={closeMenu}
                        href='/app/memos'
                        label='Mémos'
                        icon={<TextSnippetRoundedIcon />}
                    />
                    <Item
                        onClick={closeMenu}
                        href='/app/gradebooks'
                        label='Carnets de notes'
                        icon={<GradeRoundedIcon />}
                    />
                </menu>
            </dialog>
        </>
    );
};
