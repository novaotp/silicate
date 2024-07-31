<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
    import IconPinned from '@tabler/icons-svelte/icons/pinned';
    import IconPinnedFilled from '@tabler/icons-svelte/icons/pinned-filled';
	import { addToast } from '$stores/toast';
	import { getJWTFromCookies } from '$utils/jwt';
	import { patchMemo } from '../../requests';
	import type { Writable } from 'svelte/store';
	import type { Memo } from '$common/models/memo';
    import type { ApiResponse } from '$common/types/api-response';

    const memos = getContext<Writable<Memo[]>>('memos');

    $: memoId = $page.url.searchParams.get('id')!;
    $: memo = $memos.find(m => m.id === memoId);

    const editPinnedStatus = async () => {
        if (!memo) return;

        const token = getJWTFromCookies();

        // Optimistic update
        const newPinnedStatus = !memo.isPinned;
        $memos = $memos.map((m) => m.id !== memo.id ? m : { ...m, isPinned: newPinnedStatus });
        
        let response: ApiResponse;
        try {
            response = await patchMemo(token!, memo.id, { ...memo });
        } catch (error) {
            // Optimistic update failover
            $memos = $memos.map((m) => m.id !== memo.id ? m : { ...m, isPinned: !newPinnedStatus });
            console.error(error);
            return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            // Optimistic update failover
            $memos = $memos.map((m) => m.id !== memo.id ? m : { ...m, isPinned: !newPinnedStatus });
            return addToast({ type: "error", message: response.message });
        }
    }
</script>

<button on:click={editPinnedStatus}>
    {#if memo?.isPinned}
        <IconPinnedFilled />
    {:else}
        <IconPinned />
    {/if}
</button>
