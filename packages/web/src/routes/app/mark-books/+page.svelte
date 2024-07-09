<script lang="ts">
    import MainView from "$components/mark-books/MainView.svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { writable } from "svelte/store";
    import type { PageServerData } from "./$types";
    import { setContext } from "svelte";
    import type { Book, Group, Subject, Exam } from "$libs/models/Mark";

    export let data: PageServerData;

    /** Global store availability. */    
    setContext("books", writable<Book[]>([]));
    setContext("groups", writable<Group[]>([]));
    setContext("subjects", writable<Subject[]>([]));
    setContext("exams", writable<Exam[]>([]));
    setContext("currentBook", writable<Book | undefined>(undefined));
    setContext("currentGroup", writable<Group | undefined>(undefined));
    setContext("currentSubject", writable<Subject | undefined>(undefined));
    setContext("currentExam", writable<Exam | undefined>(undefined));
</script>

<svelte:head>
    <title>Carnets de note - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Visualise tes notes et moyennes par matière, identifie tes points à améliorer et fonce vers la réussite !
        Booste tes études dès aujourd'hui !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col gap-5 p-5">
    {#await data.books then books}
        {#if books}
            <MainView booksData={books} />
        {:else}
            <p class="dark:text-neutral-50">Impossible de charger les carnets de notes.</p>
        {/if}
    {:catch err}
        <p class="dark:text-neutral-50">Une erreur est survenue.</p>
        <p class="dark:text-neutral-50">{err}</p>
    {/await}
</main>
