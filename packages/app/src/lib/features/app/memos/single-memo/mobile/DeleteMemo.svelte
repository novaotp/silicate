<script lang="ts">
	import { getContext } from "svelte";
	import { page } from "$app/stores";
    import IconTrash from '@tabler/icons-svelte/icons/trash';
	import { Button } from "$ui/forms";
	import { deleteMemo } from "../../requests";
	import { addToast } from "$stores/toast";
	import { getPreference } from "$utils/capacitor-preferences";
	import { changeSearchParams } from "$utils/change-search-params";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";
	import type { ApiResponse } from "$common/types/api-response";

    const memos = getContext<Writable<Memo[]>>('memos');

    $: memoId = Number($page.url.searchParams.get('id')!);

    const destroyMemo = async () => {
        const token = await getPreference<{ jwt: string, expires: string }>('token');
        
        let response: ApiResponse;
        try {
            response = await deleteMemo(token.jwt, memoId);
        } catch (error) {
            console.error(error);
            return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            return addToast({ type: "error", message: response.message });
        }

        addToast({ type: "success", message: "Mémo supprimé avec succès." });
        $memos = $memos.filter((m) => m.id !== memoId);
        return changeSearchParams('id', null);
    }
</script>

<Button.Danger
    on:click={destroyMemo}
    variant="tertiary"
    class="px-0 h-14 border-0 rounded-none flex justify-start items-center gap-5"
>
    <IconTrash />
</Button.Danger>
