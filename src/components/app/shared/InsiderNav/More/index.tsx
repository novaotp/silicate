
"use client";

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';

// React
import { useRef, type ReactNode } from "react";

// Internal
import { Item } from './Item';

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
    }

    const closeMenu = () => {
        menuRef.current?.close();
    }

    return (
        <>
            <button onClick={openMenu} className={`relative w-10 aspect-square rounded-md flex justify-center items-center text-white`}>
                {icon}
            </button>
            <dialog ref={menuRef} className="fixed z-50 w-full p-5 m-auto rounded-md shadow-2xl">
                <header className="relative w-full h-10 mb-5 flex justify-between items-center">
                    <h2 className="text-2xl">Menu</h2>
                    <button onClick={closeMenu} className="relative h-full aspect-square">
                        <CloseRoundedIcon />
                    </button>
                </header>
                <menu>
                    <Item onClick={closeMenu} href='/app/memos' label="Mémos" icon={<TextSnippetRoundedIcon />} />
                    <Item onClick={closeMenu} href='/app/gradebooks' label="Carnets de notes" icon={<GradeRoundedIcon />} />
                </menu>
            </dialog>
        </>
    )
}
