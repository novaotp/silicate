<script lang="ts">
	import { getContext } from "svelte";
	import { page } from "$app/stores";
    import { deleteMemo } from "$features/app/memos/requests";
	import { addToast } from "$stores/toast";
	import { changeSearchParams } from "$utils/change-search-params";
	import { getJWTFromCookies } from "$utils/jwt";
	import { Button } from "$ui/forms";
	import { Overlay } from "$ui/layout";
	import { Confirm } from "$ui/modals";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";
	import type { ApiResponse } from "$common/types/api-response";

    export let showDeleteConfirmation: boolean;

    const memos = getContext<Writable<Memo[]>>('memos');

    $: memoId = $page.url.searchParams.get('memoId')!;
    $: memo = $memos.find(m => m.id === memoId)!;

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

<Overlay on:click={() => (showDeleteConfirmation = false)} class="flex justify-center items-center">
    <Confirm.Root class="relative w-full sm:max-w-[480px] flex flex-col gap-5 justify-center items-center">
        <Confirm.Title>Supprimer "{memo.title}"</Confirm.Title>
        <Confirm.Description>
            Je comprends que cette action est irréversible et que je ne pourrais pas revenir sur ma décision.
        </Confirm.Description>
        <Confirm.Actions>
            <Confirm.No>
                <Button.Danger variant="secondary" on:click={() => (showDeleteConfirmation = false)} class="w-full h-full">Annuler</Button.Danger>
            </Confirm.No>
            <Confirm.Yes>
                <Button.Danger
                    on:click={destroyMemo}
                    class="w-full h-full"
                >
                    Supprimer
                </Button.Danger>
            </Confirm.Yes>
        </Confirm.Actions>
    </Confirm.Root>
</Overlay>
