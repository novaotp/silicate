<script lang="ts">
    import MemosPage from '$lib/components/memos/MemosPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Mes mémos - Silicate</title>
</svelte:head>

<main class="relative w-full h-full p-5 pt-0 flex flex-col justify-start gap-5 overflow-auto">
    {#await data.memos}
        <p>Chargement de tes mémos...</p>
    {:then memos}
        {#if memos && data.categories}
            <MemosPage memosData={memos} categoriesData={data.categories} />
        {:else}
            <p>Impossible de charger les mémos.</p>
        {/if}
    {:catch}
        <p>Une erreur est survenue lors du chargement. Réessayez plus tard.</p>
    {/await}
</main>
