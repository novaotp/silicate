<script lang="ts">
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';

    const { memos } = getContext<MemoPageContext>('page');

    const showMemo = async (id: number) => {
        changeSearchParams('id', id);
    };
</script>

<div role="list" class="flex flex-col gap-5 mb-10">
    {#each $memos as { id, title, content } (id)}
        <button
            class="relative w-[calc(50%-20px)] p-5 gap-[10px] flex flex-col justify-between items-start cursor-pointer"
            on:click={() => showMemo(id)}
        >
            <h2 class="text-neutral-950">{title}</h2>
            <p class="text-xs text-neutral-500 line-clamp-5">{content}</p>
        </button>
    {:else}
        {#if $page.url.searchParams.get('search') !== null}
            <p>Aucun mémo ne correspond à ta recherche.</p>
        {:else}
            <p>Vous n'avez aucun mémo !</p>
        {/if}
    {/each}
</div>
