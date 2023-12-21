"use client";

// React + Next
import { type FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Internal
import { Memo } from "@/models/memo";
import { deleteMemo, getMemo, updateMemo } from "@data-access/memo";

/// -- Components -- ///
import { Header } from "./Header";
import { Title } from "./Title";
import { Editor } from "./Editor";
import { Actions } from "./Actions";
import { Loading } from "@/components/shared";

/**
 * Renders the editing page for a specific memo.
 *
 * - Allows the user to :
 *    - Modify the title and the content of the memo.
 *    - Discard, edit or delete the memo.
 *    - Return to the memos page.
 */
export const Edit = (): JSX.Element => {
    const router = useRouter();
    const memoId = Number(useParams()!.id as string);
    const [memo, setMemo] = useState<Memo | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        (async () => {
            const fetchedMemo = await getMemo(memoId);

            if (!fetchedMemo) {
                router.push("/app/memos");
                return;
            }

            setMemo(fetchedMemo);
            setTitle(fetchedMemo.title);
            setContent(fetchedMemo.content);
        })();
    }, [memoId]);

    /** Updates the note on the form's submit. */
    const handleUpdate = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        const response = await updateMemo(memo!.id, title, content);

        if (response) {
            setMemo({
                ...memo!,
                title: title,
                content: content,
            });
        }
    };

    /** Deletes the note and redirects to the `/app/notes` page. */
    const destroy = async (): Promise<void> => {
        if (!memo) {
            return;
        }

        await deleteMemo(memo.id);
        router.push("/app/memos");
    };

    /** Discards the changes and sets the values to their initial ones. */
    const discard = (): void => {
        setTitle(memo!.title);
        setContent(memo!.content);
    };

    const handleKeyDown = (event: React.KeyboardEvent): void => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();

            const formEvent = new Event("submit", {
                cancelable: true,
            }) as unknown as FormEvent;

            handleUpdate(formEvent);
        }
    };

    return (
        <div className='relative flex h-full w-full flex-col p-4'>
            {!memo ? (
                <Loading text='Chargement du mémo...' />
            ) : (
                <>
                    <Header
                        destroy={() => destroy()}
                        unsavedChanges={
                            memo.title !== title || memo.content !== content
                        }
                    />
                    <form
                        className='relative mt-5 flex w-full flex-grow flex-col'
                        onSubmit={handleUpdate}
                    >
                        <Title title={title} setTitle={setTitle} />
                        <Editor
                            content={content}
                            setContent={setContent}
                            onKeyDown={handleKeyDown}
                        />
                        <Actions
                            discard={discard}
                            disabled={
                                memo.title === title && memo.content === content
                            }
                        />
                    </form>
                </>
            )}
        </div>
    );
};
