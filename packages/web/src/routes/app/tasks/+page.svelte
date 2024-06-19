<script lang="ts">
    import { TaskList, TaskDetailsModal, AddTask, Search } from '$lib/components/tasks';
    import TaskContextProvider from '$lib/components/tasks/TaskContextProvider.svelte';
    import { changeSearchParams } from '$lib/components/tasks/utils';
    import { Skeleton, Separator } from '$lib/ui';
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { Select } from '$lib/ui';

    export let data: PageData;

    let tabs = [
        { value: '', label: 'Actives' },
        { value: 'archives', label: 'Archivées' }
    ];

    $: currentTab = $page.url.searchParams.get('tab') ?? '';
    $: archived = $page.url.searchParams.get('tab') === 'archives';

    const changeTab = (tab: string) => {
        changeSearchParams('tab', tab, { refetchData: true, removeOther: true });
    };
</script>

<svelte:head>
    <title>Tâches - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Ne manque plus jamais une deadline ou une session d'étude importante.
        Définis des rappels, reçois des notifications et priorise efficacement tes tâches.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<div class="relative w-full h-full flex flex-col justify-start">
    {#if data.data?.message || !data.tasks || !data.categories}
        <p>Une erreur est survenue lors du chargement.</p>
        <p>Erreur : {data.data?.message}</p>
    {:else}
        {#await data.tasks}
            <div class="relative w-full flex flex-col items-start gap-5">
                <Skeleton class="w-20 h-8" />
                <Skeleton class="w-full h-10" />
                <div class="relative w-full flex gap-2">
                    <Skeleton class="w-20 h-10" />
                    <Skeleton class="w-20 h-10" />
                </div>
                <div class="w-full flex flex-col">
                    <Skeleton class="w-20 h-8" />
                    {#each { length: 3 } as _, i}
                        <div class="w-full h-20 py-5 flex gap-[30px]">
                            <Skeleton class="h-full aspect-square" />
                            <div class="flex-grow flex flex-col justify-between items-start">
                                <Skeleton class="w-40 h-5" />
                                <Skeleton class="w-20 h-4" />
                            </div>
                            <Skeleton class="h-full aspect-square rounded-[50%]" />
                        </div>
                        {#if i !== 2}
                            <Separator />
                        {/if}
                    {/each}
                </div>
                <div class="w-full flex flex-col">
                    <Skeleton class="w-20 h-8" />
                    {#each { length: 2 } as _, i}
                        <div class="w-full h-20 py-5 flex gap-[30px]">
                            <Skeleton class="h-full aspect-square" />
                            <div class="flex-grow flex flex-col justify-between items-start">
                                <Skeleton class="w-40 h-5" />
                                <Skeleton class="w-20 h-4" />
                            </div>
                            <Skeleton class="h-full aspect-square rounded-[50%]" />
                        </div>
                        {#if i !== 1}
                            <Separator />
                        {/if}
                    {/each}
                </div>
            </div>
        {:then tasks}
            {#if tasks}
                <TaskContextProvider {tasks} categories={data.categories}>
                    <main class="relative w-full h-[calc(100%-40px)] flex flex-col justify-start gap-5 overflow-auto p-5 pt-0 md:pt-5">
                        <header class="relative w-full flex flex-col md:flex-row gap-5 justify-start md:justify-between items-center">
                            <h1 class="self-start text-xl text-primary-950">Tâches {archived ? 'Archivées' : ''}</h1>
                            <div class="relative h-full w-full md:w-auto flex gap-5 items-center">
                                <Select
                                    items={tabs}
                                    on:change={(event) => changeTab(event.detail)}
                                    class="hidden md:flex"
                                >
                                    {tabs.find(tab => tab.value === currentTab)?.label}
                                </Select>
                                <Search />
                                <div class="hidden md:block h-full">
                                    <AddTask />
                                </div>
                            </div>
                        </header>
                        <TaskList />
                    </main>
                    <menu
                        class="fixed md:hidden bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)]"
                    >
                        <button
                            class="border-b-2 {currentTab === '' ? 'border-primary-600' : 'border-transparent text-neutral-600'}"
                            on:click={() => changeTab('')}
                        >
                            Tâches
                        </button>
                        <AddTask />
                        <button
                            class="border-b-2 {currentTab === 'archives' ? 'border-primary-600' : 'border-transparent text-neutral-600'}"
                            on:click={() => changeTab('archives')}
                        >
                            Archives
                        </button>
                    </menu>
                    <TaskDetailsModal />
                </TaskContextProvider>
            {:else}
                <p>Une erreur est survenue lors du chargement des tâches.</p>
            {/if}
        {:catch}
            <p>Une erreur est survenue lors du chargement des tâches.</p>
        {/await}
    {/if}
</div>
