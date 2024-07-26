<script lang="ts">
	import { getContext } from "svelte";
    import { getPreference } from "$utils/capacitor-preferences";
	import { patchMemo } from "$features/app/memos/requests";
	import { addToast } from "$stores/toast";
	import type { ChangeEventHandler } from "svelte/elements";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";
	import type { ApiResponse } from "$common/types/api-response";
	import { page } from "$app/stores";
    
    const memos = getContext<Writable<Memo[]>>('memos');
    
    let timer: NodeJS.Timeout;

    $: memoId = Number($page.url.searchParams.get('id')!);
    $: memo = $memos.find(m => m.id === memoId);

    const onTitleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
        clearTimeout(timer);

        /**
         * ! Very important to add
         * ? Because if the page is closed, the memoId is undefined
         * ? when running the function in setTimeout.
         */
        const id = memoId;
        const newTitle = event.currentTarget.value;

        timer = setTimeout(async () => {
            await changeTitle(id, newTitle);
        }, 750);
    }

    const changeTitle = async (id: number, newTitle: string) => {
        const token = await getPreference<{ jwt: string, expires: string }>('token');

        const oldTitle = $memos.find(m => m.id === id)!.title;

        // Optimistic update
        $memos = $memos.map(m => m.id === id ? { ...m, title: newTitle } : m);

        let response: ApiResponse;
        try {
            response = await patchMemo(token.jwt, id, { title: newTitle });
        } catch (error) {
            // Optimistic update : revert
            $memos = $memos.map(m => m.id === id ? { ...m, title: oldTitle } : m);

            console.error(error);
            return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            // Optimistic update : revert
            $memos = $memos.map(m => m.id === id ? { ...m, title: oldTitle } : m);

            return addToast({ type: "error", message: response.message });
        }
    }
</script>

<input
    value={memo?.title}
    on:input={onTitleChange}
    class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium h-10 dark:text-neutral-50"
/>
