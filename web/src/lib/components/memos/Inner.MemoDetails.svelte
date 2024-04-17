<script lang="ts">
    import { MemoRequests } from '$lib/requests/memos';
    import { addToast } from '$lib/stores/toast';
    import type { Memo } from '$libs/models/Memo';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import Editor from './Editor/Editor.svelte';
    import { Button, FullScreen } from '$lib/ui';
    import { IconTrash } from '@tabler/icons-svelte';
    import { fly } from 'svelte/transition';

    export let showSettings: boolean;
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

    const destroy = async () => {
        const { success, message } = await requests.deleteMemo(replica.id);

        if (!success) {
            addToast({ type: 'error', message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche supprimée avec succès.' });
        }

        $memos = $memos.filter((m) => m.id !== replica.id);

        changeSearchParams('id', null);
    };
</script>

<input
    value={replica.title}
    on:input={async (event) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await edit('title', event.currentTarget.value);
        }, 750);
    }}
    class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium h-10"
/>
<Editor
    content={replica.content}
    on:edit={async (event) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await edit('content', event.detail);
        }, 750);
    }}
/>
{#if showSettings}
    <FullScreen.Backdrop on:click={() => (showSettings = false)} class="flex justify-center items-end z-[999]">
        <div role="dialog" class="fixed w-full flex flex-col shadow-2xl bg-white" transition:fly={{ y: 50 }}>
            <Button.Danger variant="secondary" on:click={destroy} class="px-5 h-14 border-0 rounded-none flex justify-start items-center gap-10">
                <IconTrash />
                <span>Supprimer</span>
            </Button.Danger>
        </div>
    </FullScreen.Backdrop>
{/if}
