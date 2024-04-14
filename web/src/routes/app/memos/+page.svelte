<script lang="ts">
    import { AddMemo, Categories, MemoDetails, MemoList, Search } from '$lib/components/memos';
    import MemoContextProvider from '$lib/components/memos/MemoContextProvider.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Mes mémos - Silicate</title>
    <meta
        name="description"
        content="N'oublie rien. Crée et gère des mémos en ligne pour un esprit clair et organisé.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full p-5 pt-0 flex flex-col justify-start gap-5 overflow-auto">
    {#await data.memos}
        <p>Chargement de tes mémos...</p>
    {:then memos}
        {#if memos && data.categories}
            {@const categories = data.categories}
            <MemoContextProvider {memos} {categories}>
                <header class="relative w-full flex justify-start items-center">
                    <h1 class="text-xl text-primary-950">Mémos</h1>
                </header>
                <Search />
                <Categories />
                <AddMemo />
                <MemoList />
                <MemoDetails />
            </MemoContextProvider>
        {:else}
            <p>Impossible de charger les mémos.</p>
        {/if}
    {:catch}
        <p>Une erreur est survenue lors du chargement. Réessayez plus tard.</p>
    {/await}
</main>
