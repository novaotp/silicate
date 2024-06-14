<script lang="ts">
    import { page } from '$app/stores';
    import { getContext, onMount } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import Masonry from '$lib/ui/Masonry/Masonry.svelte';

    const { memos } = getContext<MemoPageContext>('page');

    $: search = $page.url.searchParams.get('search');

    const showMemo = (id: number) => {
        changeSearchParams('id', id);
    };
</script>

{#if $memos.length === 0 && search !== null}
    <p>Aucun mémo ne correspond à ta recherche.</p>
{:else if $memos.length === 0 && search === null}
    <p>Vous n'avez aucun mémo !</p>
{:else}
    <Masonry items={$memos}>
        {#each $memos as { id, title, content } (id)}
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
{/if}

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
