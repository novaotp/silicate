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

<header class="md:flex relative w-full hidden flex-col md:flex-row h-[50px] gap-5 justify-start md:justify-between items-center">
    <h1 class="self-start text-xl text-primary-950 dark:text-neutral-50">Carnets de notes</h1>
    <div class="relative h-full w-full md:w-auto flex gap-5 items-center">
        <Button.Normal on:click={() => (showBookCreationModal = true)} class="md:relative h-full flex-center gap-5">
            <IconPlus class="min-w-6 min-h-6" />
            <span class="whitespace-nowrap">Ajouter un carnet</span>
        </Button.Normal>
    </div>
</header>
{#if $books.length > 0}
    <h1 class="dark:text-neutral-50 md:hidden">Carnets de notes</h1>
    <BookList />
    <Button.Normal on:click={() => (showBookCreationModal = true)} class="fixed md:hidden bottom-5 right-5 w-[60px] aspect-square flex-center gap-5">
        <IconPlus class="min-w-6 min-h-6" />
    </Button.Normal>
{:else}
    <EmptyBooks bind:showBookCreationModal />
{/if}

{#if showBookCreationModal}
    <BookCreationModal on:close={() => (showBookCreationModal = false)} />
{/if}
