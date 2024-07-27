<script lang="ts">
	import { getContext } from 'svelte';
    import IconPinned from '@tabler/icons-svelte/icons/pinned';
    import IconPinnedFilled from '@tabler/icons-svelte/icons/pinned-filled';
	import { getPreference } from '$utils/capacitor-preferences';
	import { addToast } from '$stores/toast';
	import type { Memo } from '$common/models/memo';
	import { patchMemo } from '../../requests';
	import type { Writable } from 'svelte/store';
    import type { ApiResponse } from '$common/types/api-response';
	import { page } from '$app/stores';

    const memos = getContext<Writable<Memo[]>>('memos');

    $: memoId = Number($page.url.searchParams.get('id')!);
    $: memo = $memos.find(m => m.id === memoId);

    const editPinnedStatus = async () => {
        if (!memo) return;

        const token = await getPreference<{ jwt: string, expires: string }>('token');

        // Optimistic update
        const newPinnedStatus = !memo.pinned;
        $memos = $memos.map((m) => m.id !== memo.id ? m : { ...m, pinned: newPinnedStatus });
        
        let response: ApiResponse;
        try {
            response = await patchMemo(token.jwt, memo.id, { ...memo });
        } catch (error) {
            // Optimistic update failover
            $memos = $memos.map((m) => m.id !== memo.id ? m : { ...m, pinned: !newPinnedStatus });
            console.error(error);
            return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            // Optimistic update failover
            $memos = $memos.map((m) => m.id !== memo.id ? m : { ...m, pinned: !newPinnedStatus });
            return addToast({ type: "error", message: response.message });
        }
    }
</script>

<button on:click={editPinnedStatus}>
    {#if memo?.pinned}
        <IconPinnedFilled />
    {:else}
        <IconPinned />
    {/if}
</button>
