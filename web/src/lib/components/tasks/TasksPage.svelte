<script lang="ts">
    import type { Task } from '$libs/models/Task';
    import { getContext, setContext } from 'svelte';
    import type { PageContext } from './types';
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { addTask } from './TasksPage';
    import { addToast } from '$lib/stores/toast';
    import { calculateCompletion, fetchTasks } from './utils';
    import { goto } from '$app/navigation';
    import { IconCheck, IconPlus } from '@tabler/icons-svelte';
    import Search from './Search.svelte';
    import Categories from './Categories.svelte';
    import TaskDetailsModal from './TaskDetails/TaskDetailsModal.svelte';
    import TaskList from './TaskList.svelte';

    export let data: Task[];
    export let categories: string[];

    setContext<PageContext>('page', {
        tasks: writable(data),
        categories
    });

    const { tasks } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    let viewedTaskId: number | null = null;
    $: currentTab = $page.url.searchParams.get('tab') ?? '';
    $: archived = $page.url.searchParams.get('tab') === 'archives';
    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    const add = async () => {
        const result = await addTask(jwt);

        if (result.message) {
            addToast({ type: 'error', message: result.message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche ajoutée avec succès.' });
        }

        const updatedTasks = await fetchTasks(jwt, category, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };

    const changeTab = (tab: string) => {
        goto(`/app/tasks${tab ? `tab=${tab}` : ''}`, { invalidateAll: true });
    };

    $: {
        if (viewedTaskId !== null) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    $: title = viewedTaskId ? $tasks.find(t => t.id === viewedTaskId)?.title : "Tâches";
</script>

<svelte:head>
    <title>{title} - Silicate</title>
</svelte:head>

<div class="relative w-full h-full flex flex-col justify-start gap-5">
    <header class="relative w-full flex justify-start items-center">
        <h1 class="text-xl">Tâches {archived ? 'Archivées' : ''}</h1>
    </header>
    <Search />
    <Categories {categories} />
    <TaskList on:click={(event) => (viewedTaskId = event.detail)} />
</div>
<menu class="fixed bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)]">
    <button class="border-b-2 {currentTab === '' ? 'border-blue-500' : 'border-transparent'}" on:click={() => changeTab('')}> Tâches </button>
    <button
        class="relative bottom-1/2 h-[50px] aspect-square rounded-full bg-blue-500 text-white flex justify-center items-center shadow-lg"
        on:click={add}
    >
        <IconPlus />
    </button>
    <button class="border-b-2 {currentTab === 'archives' ? 'border-blue-500' : 'border-transparent'}" on:click={() => changeTab('archives')}>
        Archives
    </button>
</menu>
<TaskDetailsModal {viewedTaskId} on:close={() => (viewedTaskId = null)} />
