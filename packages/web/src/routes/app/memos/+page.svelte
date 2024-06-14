<script lang="ts">
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { AddMemo, Categories, MemoDetails, MemoList, Search } from '$lib/components/memos';
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
        <p>Chargement de tes mémos...</p>
    {:then memos}
        {#if memos && data.categories}
            {@const categories = data.categories}
            <MemoContextProvider {memos} {categories}>
                <header class="relative w-full flex flex-col md:flex-row gap-5 justify-start md:justify-between items-center">
                    <h1 class="relative self-start h-full flex items-center text-xl text-primary-950">Mémos</h1>
                    <div class="relative h-full flex gap-5 items-center">
                        <Search />
                        <AddMemo />
                    </div>
                </header>
                <Categories />
                <div class="block md:hidden">
                    <AddMemo />
                </div>
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
