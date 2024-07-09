<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import type { Book } from "$libs/models/Mark";
    import { changeSearchParams } from "$utils/change-search-params";
    import { getContext } from "svelte";
    import MarkBookPage from "./[id]/MarkBookPage.svelte";
    import type { Writable } from "svelte/store";

    export let booksData: Book[];

    const books = getContext<Writable<Book[]>>("books");
    const currentBook = getContext<Writable<Book | undefined>>("currentBook");

    $books = booksData;

    $: viewBookId = $page.url.searchParams.get("bookId");
    $: $currentBook = $books.find(b => b.id.toString() === viewBookId);

    const showBookView = (book: Book) => {
        changeSearchParams("bookId", book.id);
    }

    const closeBookView = () => {
        changeSearchParams("bookId", null);
    }
</script>

<h1 class="dark:text-neutral-50">Carnets de notes</h1>
{#each $books as book}
    <button
        on:click={() => showBookView(book)}
        class="relative w-full p-5 rounded-lg bg-neutral-50 flex justify-center items-center gap-5"
    >
        <div class="relative flex-grow flex flex-col justify-between items-start gap-[10px]">
            <h2>{book.title}</h2>
            <p class="text-neutral-500 text-sm text-start">{book.description}</p>
        </div>
        <div class="relative my-auto min-w-10 h-10 rounded-full bg-primary-600 text-white grid place-items-center">
            {book.averageScore}
        </div>
    </button>
{:else}
    <p>Seems like you haven't created a book yet !</p>
{/each}
{#if viewBookId}
    <MarkBookPage on:close={closeBookView} />
{/if}
