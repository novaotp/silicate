<script lang="ts">
    import { page } from '$app/stores';
    import { TaskContextProvider, TaskDetailsModal, Menu, Categories, Search, TaskList, Loading } from '$components/tasks';
    import { getTasks, getCategories } from '$lib/requests/tasks';

    $: urlSearchParams = new URLSearchParams($page.url.searchParams);
    $: category = urlSearchParams.get('category') ?? '';
    $: search = urlSearchParams.get('search') ?? '';
    $: currentTab = urlSearchParams.get('tab') ?? '';
    $: archived = urlSearchParams.get('tab') === 'archives';

    async function fetchData() {
        const taskResults = await getTasks(category, search, archived);
        const categoryResults = await getCategories(archived);

        return {
            tasks: taskResults.success ? taskResults.data : undefined,
            categories: categoryResults.success ? categoryResults.data : undefined
        };
    }
</script>

<svelte:head>
    <title>Tâches - {env.VITE_APP_NAME}</title>
    <meta
        name="description"
        content="Ne manque plus jamais une deadline ou une session d'étude importante.
        Définis des rappels, reçois des notifications et priorise efficacement tes tâches.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<AppLayout>
    <div class="relative w-full h-full p-5 pt-0 flex flex-col justify-start">
        {#await fetchData()}
            <Loading />
        {:then data}
            {#if data.tasks && data.categories}
                <TaskContextProvider tasks={data.tasks} categories={data.categories}>
                    <main class="relative w-full h-[calc(100%-40px)] flex flex-col justify-start gap-5 overflow-auto scroll">
                        <header class="relative w-full flex justify-start items-center">
                            <h1 class="text-xl text-primary-950">Tâches {archived ? 'Archivées' : ''}</h1>
                        </header>
                        <Search />
                        <Categories />
                        <TaskList />
                    </main>
                    <Menu />
                    <TaskDetailsModal />
                </TaskContextProvider>
            {:else}
                <p>Une erreur est survenue lors du chargement des tâches.</p>
            {/if}
        {:catch}
            <p>Une erreur est survenue lors du chargement des tâches.</p>
        {/await}
    </div>
</AppLayout>

<style>
    .scroll {
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
    }
    .scroll::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
</style>
