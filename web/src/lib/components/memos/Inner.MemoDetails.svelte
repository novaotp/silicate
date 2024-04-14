<script lang="ts">
    import { MemoRequests } from '$lib/requests/memos';
    import { addToast } from '$lib/stores/toast';
    import type { Memo } from '$libs/models/Memo';
    import { getContext } from 'svelte';
    import type { MemoPageContext } from './utils';

    export let memo: Memo;
    let replica = { ...memo };

    const { memos } = getContext<MemoPageContext>('page');
    const jwt = getContext<string>('jwt');
    const requests = new MemoRequests(jwt);

    let timer: NodeJS.Timeout;

    const edit = async (key: 'title' | 'content', newValue: string) => {
        replica[key] = newValue;

        const result = await requests.updateMemo(memo.id, {
            title: replica.title,
            content: replica.content,
            category: replica.category
        });

        if (!result.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour le mémo.' });
            return;
        }

        memo = replica;
        $memos = $memos.map((m) => (m.id !== memo.id ? m : replica));
    };

    const editMemo = async (key: 'title' | 'content', newValue: string) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await edit(key, newValue);
        }, 500);
    };
</script>

<input
    value={replica.title}
    on:input={async (event) => await edit('title', event.currentTarget.value)}
    class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium"
/>
<textarea
    class="relative w-full flex-grow text-sm resize-none"
    value={replica.content}
    on:input={async (event) => await editMemo('content', event.currentTarget.value)}
></textarea>
