<script lang="ts">
    import type { Book } from "$libs/models/Mark";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import { Button } from "$lib/ui";
    import BookCreationModal from "./BookCreationModal.svelte";
    import EmptyBooks from "./EmptyBooks.svelte";
    import BookList from "./BookList.svelte";
    import { getContext } from "svelte";
    import { type Writable } from "svelte/store";

    const books = getContext<Writable<Book[]>>("books");

    let showBookCreationModal: boolean = false;
</script>

{#if $books.length > 0}
    <h1 class="dark:text-neutral-50">Carnets de notes</h1>
    <BookList />
    <Button.Normal on:click={() => (showBookCreationModal = true)} class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5">
        <IconPlus class="min-w-6 min-h-6" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un mémo</span>
    </Button.Normal>
{:else}
    <EmptyBooks bind:showBookCreationModal />
{/if}

{#if showBookCreationModal}
    <BookCreationModal on:close={() => (showBookCreationModal = false)} />
{/if}
