
'use client';

// Next
import { useRouter } from "next/navigation";

// Internal
import { createMemo } from "@data-access/memo";
import { useToast } from "@/libs/contexts/ToastContext";

/**
 * Renders a button to create a new memo and redirect to the editing page.
 */
export const AddButton = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const handleOnClick = async () => {
    const noteId = await createMemo("Mon mémo", "");

    if (!noteId) {
      showToast('Une erreur est survenue lors de la création de votre mémo. Veuillez réessayer ultérieurement.', 'error')
      return;
    }

    showToast('Votre mémo a été créé avec succès.', 'success')
    router.push(`/app/memos/${noteId}`);
  }

  return (
    <button
      onClick={handleOnClick}
      className="absolute w-[60px] aspect-square bottom-5 right-5 rounded-xl bg-blue-500 text-white text-3xl"
    >
      +
    </button>
  )
}
