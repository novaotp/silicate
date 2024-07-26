<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { page } from "$app/stores";
	import { patchMemo } from "$features/app/memos/requests";
	import { addToast } from "$stores/toast";
	import { getPreference } from "$utils/capacitor-preferences";
	import { Editor } from "./editor";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";
	import type { ApiResponse } from "$common/types/api-response";

    const memos = getContext<Writable<Memo[]>>('memos');
    
    let timer: NodeJS.Timeout;

    $: memoId = Number($page.url.searchParams.get('id')!);
    $: memo = $memos.find(m => m.id === memoId);

    const onContentChange = (event: CustomEvent<string>) => {
        clearTimeout(timer);

        /**
         * ! Very important to add
         * ? Because if the page is closed, the memoId is undefined
         * ? when running the function in setTimeout.
         */
        const id = memoId;
        const newContent = event.detail;

        timer = setTimeout(async () => {
            await changeContent(id, newContent);
        }, 750);
    }

    const changeContent = async (id: number, newContent: string) => {
        const token = await getPreference<{ jwt: string, expires: string }>('token');

        const oldContent = $memos.find(m => m.id === id)!.content;

        // Optimistic update
        $memos = $memos.map(m => m.id === id ? { ...m, content: newContent } : m);

        let response: ApiResponse;
        try {
            response = await patchMemo(token.jwt, id, { content: newContent });
        } catch (error) {
            // Optimistic update : revert
            $memos = $memos.map(m => m.id === id ? { ...m, content: oldContent } : m);

            console.error(error);
            return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            // Optimistic update : revert
            $memos = $memos.map(m => m.id === id ? { ...m, content: oldContent } : m);

            return addToast({ type: "error", message: response.message });
        }
    }
</script>

<Editor content={memo?.content} on:edit={onContentChange} />
