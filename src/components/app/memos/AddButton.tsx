
// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';

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
  }

  return (
    <form action={handleNewMemo}>
      <button className="absolute w-[60px] aspect-square bottom-5 right-5 flex justify-center items-center rounded-full bg-blue-500 text-white">
        <AddRoundedIcon className="text-3xl" />
      </button>
    </form>
  )
}
