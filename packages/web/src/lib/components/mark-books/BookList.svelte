<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Book } from '$libs/models/Mark';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    const books = getContext<Writable<Book[]>>("books");
</script>

{#each $books as book}
    <button
        on:click={() => goto(`/app/mark-books/${book.id}`)}
        class="relative w-full p-5 rounded-lg bg-neutral-50 flex justify-center items-center gap-5"
    >
        <div
            class="relative flex-grow flex flex-col justify-between items-start gap-[10px]"
        >
            <h2>{book.title}</h2>
            {#if book.description}
                <p class="text-neutral-500 text-sm text-start">
                    {book.description}
                </p>
            {/if}
        </div>
        {#if book.averageScore}
            <div
                class="relative my-auto min-w-10 h-10 rounded-full bg-primary-600 text-white grid place-items-center"
            >
                {book.averageScore}
            </div>
        {/if}
    </button>
{/each}
