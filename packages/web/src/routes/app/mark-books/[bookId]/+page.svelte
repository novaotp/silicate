<script lang="ts">
    import ContextProvider from '$components/mark-books/[bookId]/ContextProvider.svelte';
    import MainView from '$components/mark-books/[bookId]/MainView.svelte';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{data.book?.title} - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Explore les détails de ton carnet de notes, organise tes
                 groupes et matières, et suis tes progrès académiques.
                 Améliore tes performances dès aujourd'hui !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col gap-5 p-5 pt-0">
    {#await data.groupsAndSubjects}
        <p>Chargement des données du bulletin...</p>
    {:then groupsAndSubjects}
        {#if data.book && groupsAndSubjects}
            {@const { groups, subjects } = groupsAndSubjects}
            <ContextProvider book={data.book} {groups} {subjects}>
                <MainView />
            </ContextProvider>
        {:else}
            <p class="dark:text-neutral-50">
                Impossible de charger le carnet de notes.
            </p>
        {/if}
    {:catch err}
        <p class="dark:text-neutral-50">Une erreur est survenue.</p>
        <p class="dark:text-neutral-50">{err}</p>
    {/await}
</main>
