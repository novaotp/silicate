<script lang="ts">
    import type { Book } from "$libs/models/Mark";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import BookEditionModal from "./BookEditionModal.svelte";

    export let showBookEditionModal: boolean;

    const book = getContext<Writable<Book>>("book");
</script>

<!--
@component
An overview of the mark-book's data. Opens a modal to edit the data.
-->

<button
    on:click={() => (showBookEditionModal = true)}
    class="rounded-lg p-5 bg-primary-500 text-white flex flex-col gap-5"
>
    <div class="flex justify-between">
        <div class="flex gap-5">
            <h1>{$book.title}</h1>
        </div>
        {#if $book.averageScore}
            <span>{$book.averageScore}</span>
        {/if}
    </div>
    {#if $book.description}
        <p class="text-sm text-start">{$book.description}</p>
    {/if}
</button>

{#if showBookEditionModal}
    <BookEditionModal on:close={() => (showBookEditionModal = false)} />
{/if}
