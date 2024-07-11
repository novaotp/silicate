<script lang="ts">
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import Masonry from '$lib/ui/Masonry/Masonry.svelte';
    import Categories from './Categories.svelte';

    const { memos } = getContext<MemoPageContext>('page');

    $: search = $page.url.searchParams.get('search');
    $: pinnedMemos = $memos.filter((memo) => memo.pinned);
    $: unpinnedMemos = $memos.filter((memo) => !memo.pinned);

    const showMemo = (id: number) => {
        changeSearchParams('id', id);
    };

    const stripHTML = (html: string) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent;
    }
</script>

<div class="relative w-[min(100%,800px)] h-full mx-auto flex flex-col gap-5">
    {#if $memos.length === 0 && search}
        <div class="relative w-full h-full flex flex-col md:flex-row-reverse justify-center items-center">
            <img src="/illustrations/no-results.png" alt="Illustration : Pas de mémos trouvés" class="w-3/5 xsm:w-1/2 sm:2/5 self-center" />
            <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
                <h2 class="text-2xl xsm:text-center max-w-[400px] dark:text-neutral-50">
                    Désolé, nous n'avons trouvé aucun mémo pour {search}
                </h2>
                <p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
                    Essaie de chercher avec un autre terme.
                </p>
            </div>
        </div>
    {:else if $memos.length === 0 && search === null}
        <p>Vous n'avez aucun mémo !</p>
    {:else}
        <Categories />
        {#if pinnedMemos.length > 0}
            <div class="flex flex-col gap-[10px]">
                <h2 class="dark:text-neutral-50">Mémos épinglés</h2>
                <Masonry items={$memos}>
                    {#each pinnedMemos as { id, title, content } (id)}
                        <button
                            class="relative p-5 gap-[10px] flex flex-col justify-between items-start border border-neutral-300 dark:border-none dark:bg-neutral-800 rounded-lg"
                            on:click={() => showMemo(id)}
                        >
                            <h2 class="text-neutral-950 text-start dark:text-neutral-50">{title}</h2>
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
                    <h2 class="dark:text-neutral-50">Autres</h2>
                {/if}
                <Masonry items={$memos}>
                    {#each unpinnedMemos as { id, title, content } (id)}
                        <button
                            class="relative p-5 gap-[10px] flex flex-col justify-between items-start border border-neutral-300 dark:border-none dark:bg-neutral-800 rounded-lg"
                            on:click={() => showMemo(id)}
                        >
                            <h2 class="text-neutral-950 text-start dark:text-neutral-50">{title}</h2>
                            {#if content !== ''}
                                <div
                                    class="preview-content relative w-full text-xs text-neutral-500 dark:text-neutral-300 text-justify overflow-y-hidden text-ellipsis pointer-events-none"
                                    spellcheck="false"
                                >
                                    {stripHTML(content)}
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
