<script lang="ts">
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import MemoContextProvider from '$lib/components/memos/MemoContextProvider.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Mes mémos - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="N'oublie rien. Crée et gère des mémos en ligne pour un esprit clair et organisé.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-start gap-5 overflow-auto p-5 pt-0 md:pt-5">
    {#await data.memos}
        <p class="dark:text-neutral-50">Chargement de tes mémos...</p>
    {:then memos}
        {#if memos && data.categories}
            <MemoContextProvider {memos} categories={data.categories} />
        {:else}
            <p class="dark:text-neutral-50">Impossible de charger les mémos.</p>
        {/if}
    {:catch}
        <p class="dark:text-neutral-50">Une erreur est survenue lors du chargement. Réessayez plus tard.</p>
    {/await}
</main>
