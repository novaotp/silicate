<script lang="ts">
	import { getContext } from "svelte";
	import { page } from "$app/stores";
    import IconTrash from '@tabler/icons-svelte/icons/trash';
	import { Button } from "$ui/forms";
	import { deleteMemo } from "../../requests";
	import { addToast } from "$stores/toast";
	import { changeSearchParams } from "$utils/change-search-params";
	import { getJWTFromCookies } from "$utils/jwt";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";
	import type { ApiResponse } from "$common/types/api-response";

    const memos = getContext<Writable<Memo[]>>('memos');

    $: memoId = $page.url.searchParams.get('memoId')!;

    const destroyMemo = async () => {
        const token = getJWTFromCookies();
        
        let response: ApiResponse;
        try {
            response = await deleteMemo(token!, memoId);
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
    class="px-0 rounded-none"
>
    <IconTrash />
</Button.Danger>
