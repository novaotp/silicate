<script lang="ts">
    import { goto } from '$app/navigation';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;

    const books = setContext('books', writable(data.books));
</script>

<div class="relative w-full h-full flex">
    <div class="hidden md:flex relative w-[250px] flex-col h-full bg-neutral-100">
        <div class="relative w-full h-[120px] bg-primary-500 p-5 flex items-center">
            <h2 class="text-white text-xl">Carnets de notes</h2>
        </div>
        <ul class="relative w-full flex flex-col gap-5 p-5">
            {#each $books as book (book.id)}
                <li class="w-full">
                    <button on:click={() => goto(`/app/mark-books/${book.id}`)} class="w-full flex justify-between items-center">
                        <span>{book.title}</span>
                        {#if book.averageScore}
                        <div
                            class="relative my-auto min-w-10 h-10 rounded-full bg-primary-600 text-white grid place-items-center"
                        >
                            {book.averageScore}
                        </div>
                        {/if}
                    </button>
                </li>
            {/each}
        </ul>
    </div>
    <div class="relative flex-grow h-full md:shadow-[-2px_0_4px_4px_rgba(0,0,0,0.1)]">
        <slot />
    </div>
</div>
