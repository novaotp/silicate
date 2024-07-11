<script lang="ts">
    import { setContext } from "svelte";
    import type { PageContext } from "./utils";
    import { writable } from "svelte/store";
    import type { Task } from "$libs/models/Task";
    import { Select } from "$lib/ui";
    import { Search, AddTask, TaskList, TaskDetailsModal } from ".";
    import { page } from "$app/stores";
    import { changeSearchParams } from "$utils/change-search-params";
    import NoTask from "./NoTask.svelte";

    export let tasks: Task[];
    export let otherTasks: Task[];
    export let categories: string[];

    const { tasks: _tasks, otherTasks: _otherTasks } = setContext<PageContext>('page', {
        tasks: writable(tasks),
        otherTasks: writable(otherTasks),
        categories: writable(categories)
    });

    let tabs = [
        { value: '', label: 'Actives' },
        { value: 'archives', label: 'Archivées' }
    ];

    $: currentTab = $page.url.searchParams.get('tab') ?? '';
    $: archived = $page.url.searchParams.get('tab') === 'archives';
    $: search = $page.url.searchParams.get('search') ?? '';

    const changeTab = (tab: string) => {
        changeSearchParams('tab', tab, { invalidateAll: true, removeOtherParams: true });
    };
</script>

{#if $_tasks.length > 0 || search !== "" || $_otherTasks.length > 0}
    <main class="relative w-full h-[calc(100%-40px)] flex flex-col justify-start gap-5 overflow-auto p-5 pt-0 md:pt-5">
        <header class="relative w-full flex flex-col md:flex-row gap-5 justify-start md:justify-between items-center">
            <h1 class="self-start text-xl text-primary-950 dark:text-neutral-50">Tâches {archived ? 'Archivées' : ''}</h1>
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
        class="fixed md:hidden bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white dark:bg-neutral-900 z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)] dark:shadow-none"
    >
        <button
            class="border-b-2 {currentTab === '' ? 'dark:text-neutral-50 border-primary-600 dark:border-primary-400' : 'border-transparent text-neutral-600 dark:text-neutral-300'}"
            on:click={() => changeTab('')}
        >
            Tâches
        </button>
        <AddTask />
        <button
            class="border-b-2 {currentTab === 'archives' ? 'dark:text-neutral-50 border-primary-600 dark:border-primary-400' : 'border-transparent text-neutral-600 dark:text-neutral-300'}"
            on:click={() => changeTab('archives')}
        >
            Archives
        </button>
    </menu>
{:else}
    <NoTask />
{/if}
<TaskDetailsModal />
