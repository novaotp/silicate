<script lang="ts">
    import ContextProvider from "$components/mark-books/ContextProvider.svelte";
    import MainView from "$components/mark-books/MainView.svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
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
    {#await data.books}
        <p>Chargement des carnets de notes...</p>
    {:then books}
        {#if books}
            <ContextProvider {books}>
                <MainView />
            </ContextProvider>
        {:else}
            <p class="dark:text-neutral-50">Impossible de charger les carnets de notes.</p>
        {/if}
    {:catch err}
        <p class="dark:text-neutral-50">Une erreur est survenue.</p>
        <p class="dark:text-neutral-50">{err}</p>
    {/await}
</main>
