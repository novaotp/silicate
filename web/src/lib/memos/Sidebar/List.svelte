<script lang="ts">
    import type { Memo } from '$libs/models/Memo';
    import { setSelectedMemoId } from '$stores/memo';
    import { parse } from 'marked';

    export let search: string;
    export let memos: Memo[] | undefined;
</script>

{#if !memos}
    <p>Une erreur est survenue.</p>
{:else}
    <ul
        class="relative w-full flex flex-col gap-5 overflow-scroll"
    >
        {#each memos as memo}
            <li
                class="relative w-full"
            >
                <a
                    href={`/app/memos/${memo.id}`}
                    class="relative flex max-h-[200px] w-full flex-col bg-stone-300 p-3 rounded-lg lg:hidden"
                >
                    <h2>{memo.title}</h2>
                    <p class="line-clamp-3 text-xs">
                        {@html parse(memo.content)}
                    </p>
                </a>
                <button
                    class="relative hidden max-h-[200px] w-full flex-col bg-stone-300 p-3 rounded-lg lg:flex"
                    on:click={
                        () => setSelectedMemoId(memo.id)
                    }
                >
                    <h2>{memo.title}</h2>
                </button>
            </li>
        {:else}
            {#if search === ''}
                <p>Tu n'as pas encore créé de mémos.</p>
            {:else}
                <p>Aucun résultat trouvé pour la recherche.</p>
            {/if}
        {/each}
    </ul>
{/if}
