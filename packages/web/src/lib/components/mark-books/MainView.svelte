<script lang="ts">
    import { page } from "$app/stores";
    import type { Book } from "$libs/models/Mark";
    import { changeSearchParams } from "$utils/change-search-params";
    import { getContext, onMount } from "svelte";
    import MarkBookPage from "./[id]/MarkBookPage.svelte";
    import type { Writable } from "svelte/store";
    import IconPlus from "@tabler/icons-svelte/IconPlus.svelte";
    import { Button } from "$lib/ui";
    import BookCreationModal from "./BookCreationModal.svelte";

    export let booksData: Book[];

    const books = getContext<Writable<Book[]>>("books");
    const currentBook = getContext<Writable<Book | undefined>>("currentBook");

    let showBookCreationModal: boolean = false;

    $books = booksData;

    $: viewBookId = $page.url.searchParams.get("bookId");

    onMount(() => {
        $currentBook = $books.find(b => b.id.toString() === viewBookId);
    })

    const showBookView = (book: Book) => {
        changeSearchParams("bookId", book.id);
        $currentBook = $books.find(b => b.id === book.id);
    }
</script>

{#if $books.length > 0}
    <h1 class="dark:text-neutral-50">Carnets de notes</h1>
    {#each $books as book}
        <button
            on:click={() => showBookView(book)}
            class="relative w-full p-5 rounded-lg bg-neutral-50 flex justify-center items-center gap-5"
        >
            <div class="relative flex-grow flex flex-col justify-between items-start gap-[10px]">
                <h2>{book.title}</h2>
                {#if book.description}
                    <p class="text-neutral-500 text-sm text-start">{book.description}</p>
                {/if}
            </div>
            {#if book.averageScore}
                <div class="relative my-auto min-w-10 h-10 rounded-full bg-primary-600 text-white grid place-items-center">
                    {book.averageScore}
                </div>
            {/if}
        </button>
    {/each}
    <Button.Normal on:click={() => (showBookCreationModal = true)} class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5">
        <IconPlus class="min-w-5 min-h-5" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un mémo</span>
    </Button.Normal>
{:else}
    <!-- Empty state for when the user doesn't have any books yet. -->
    <div class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5">
        <img src="/illustrations/no-mark-books.png" alt="Illustration : Ajouter un carnet" class="w-3/5 xsm:w-1/2 sm:2/5 self-center" />
        <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
            <h2 class="text-2xl dark:text-neutral-50">Créer un carnet</h2>
            <p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
                Gère tes notes de cours efficacement et garde une trace de tes progrès académiques.
            </p>
            <Button.Normal on:click={() => (showBookCreationModal = true)}>
                Créer un carnet
            </Button.Normal>
        </div>
    </div>
{/if}

{#if showBookCreationModal}
    <BookCreationModal on:close={() => (showBookCreationModal = false)} />
{/if}

{#if viewBookId}
    <MarkBookPage />
{/if}
