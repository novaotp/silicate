// MUI Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";

// Next
import { redirect } from "next/navigation";

// Internal
import { createMemo } from "@data-access/memo";

/**
 * Renders a button to create a new memo and redirect to the editing page.
 */
export const AddButton = () => {
    const handleNewMemo = async () => {
        "use server";

        const noteId = await createMemo("Mon mémo", "");

        redirect(`/app/memos/${noteId}`);
    };

    return (
        <form action={handleNewMemo}>
            <button className='absolute bottom-5 right-5 flex aspect-square w-[60px] items-center justify-center rounded-full bg-blue-500 text-white'>
                <AddRoundedIcon className='text-3xl' />
            </button>
        </form>
    );
};
