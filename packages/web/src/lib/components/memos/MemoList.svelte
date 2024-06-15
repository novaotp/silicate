<script lang="ts">
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import Masonry from '$lib/ui/Masonry/Masonry.svelte';
    import Categories from './Categories.svelte';

    const { memos } = getContext<MemoPageContext>('page');

    $: search = $page.url.searchParams.get('search');

    const showMemo = (id: number) => {
        changeSearchParams('id', id);
    };

    $: pinnedMemos = $memos.filter((memo) => memo.pinned);
    $: unpinnedMemos = $memos.filter((memo) => !memo.pinned);
</script>

<div class="relative w-[min(100%,800px)] h-full mx-auto flex flex-col gap-5">
    <Categories />
    {#if $memos.length === 0 && search !== null}
        <p>Aucun mémo ne correspond à ta recherche.</p>
    {:else if $memos.length === 0 && search === null}
        <p>Vous n'avez aucun mémo !</p>
    {:else}
        {#if pinnedMemos.length > 0}
            <div class="flex flex-col gap-[10px]">
                <h2>Mémos épinglés</h2>
                <Masonry items={$memos}>
                    {#each pinnedMemos as { id, title, content } (id)}
                        <button
                            class="relative p-5 gap-[10px] flex flex-col justify-between items-start border border-neutral-300 rounded-lg"
                            on:click={() => showMemo(id)}
                        >
                            <h2 class="text-neutral-950 text-start">{title}</h2>
                            {#if content !== ''}
                                <div
                                    class="preview-content relative w-full text-xs text-neutral-500 text-justify overflow-y-hidden text-ellipsis pointer-events-none"
                                    spellcheck="false"
                                >
                                    {@html content}
                                </div>
                            {/if}
                        </button>
                    {/each}
                </Masonry>
            </div>
        {/if}
        {#if unpinnedMemos.length > 0}
            <div class="flex flex-col gap-[10px] pb-5">
                {#if pinnedMemos.length > 0 && unpinnedMemos.length > 0}
                    <h2>Autres</h2>
                {/if}
                <Masonry items={$memos}>
                    {#each unpinnedMemos as { id, title, content } (id)}
                        <button
                            class="relative p-5 gap-[10px] flex flex-col justify-between items-start border border-neutral-300 rounded-lg"
                            on:click={() => showMemo(id)}
                        >
                            <h2 class="text-neutral-950 text-start">{title}</h2>
                            {#if content !== ''}
                                <div
                                    class="preview-content relative w-full text-xs text-neutral-500 text-justify overflow-y-hidden text-ellipsis pointer-events-none"
                                    spellcheck="false"
                                >
                                    {@html content}
                                </div>
                            {/if}
                        </button>
                    {/each}
                </Masonry>
            </div>
        {/if}
    {/if}
</div>

<style>
    .preview-content::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .preview-content {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
