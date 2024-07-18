<script lang="ts">
    import ContextProvider from '$components/mark-books/[subjectId]/ContextProvider.svelte';
    import MainView from '$components/mark-books/[subjectId]/MainView.svelte';
    import Sidebar from '$components/mark-books/[subjectId]/Sidebar.svelte';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{data.subject?.title} | {data.book?.title} - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Visualise tes branches en détail, comprends les points clés de
            chaque matière, et optimise ta préparation pour réussir tes examens.
            Renforce tes connaissances dès aujourd'hui !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col gap-5">
    {#await data.exams}
        <p>Chargement des examens...</p>
    {:then exams}
        {#if data.subject && data.groups && data.subjects && exams}
            <ContextProvider groups={data.groups} subjects={data.subjects} subject={data.subject} {exams}>
                <div class="relative w-full h-full flex">
                    <Sidebar />
                    <MainView />
                </div>
            </ContextProvider>
        {:else}
            <p class="dark:text-neutral-50">
                Impossible de charger les carnets de notes.
            </p>
        {/if}
    {:catch err}
        <p class="dark:text-neutral-50">Une erreur est survenue.</p>
        <p class="dark:text-neutral-50">{err}</p>
    {/await}
</main>
