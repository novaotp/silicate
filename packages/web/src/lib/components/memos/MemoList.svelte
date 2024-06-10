<script lang="ts">
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';

    const { memos } = getContext<MemoPageContext>('page');

    const showMemo = (id: number) => {
        changeSearchParams('id', id);
    };
</script>

<div role="list" class="grid {$memos.length > 0 ? "grid-cols-[repeat(2,minmax(calc(50%-10px),1fr))]" : "grid-cols-1"} grid-flow-dense gap-5 mb-20">
    {#each $memos as { id, title, content } (id)}
        <button
            class="relative w-full p-5 gap-[10px] flex flex-col justify-between items-start border border-neutral-300 rounded-lg"
            on:click={() => showMemo(id)}
        >
            <h2 class="text-neutral-950 text-start">{title}</h2>
            {#if content !== ""}
                <span class="text-xs text-neutral-500 text-justify line-clamp-5">
                    {@html content.replaceAll("\n", "<br />")}
                </span>
            {/if}
        </button>
    {:else}
        {#if $page.url.searchParams.get('search') !== null}
            <p>Aucun mémo ne correspond à ta recherche.</p>
        {:else}
            <p>Vous n'avez aucun mémo !</p>
        {/if}
    {/each}
</div>
