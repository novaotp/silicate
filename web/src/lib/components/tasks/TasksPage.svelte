<script lang="ts">
    import type { Task } from '$libs/models/Task';
    import { getContext, setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { addTask } from './TasksPage';
    import { addToast } from '$lib/stores/toast';
    import { changeSearchParams, fetchTasks, type PageContext } from './utils';
    import { goto } from '$app/navigation';
    import { IconPlus } from '@tabler/icons-svelte';
    import Search from './Search.svelte';
    import Categories from './Categories.svelte';
    import TaskDetailsModal from './TaskDetails/TaskDetailsModal.svelte';
    import TaskList from './TaskList.svelte';

    export let data: Task[];
    export let categoriesData: string[];

    setContext<PageContext>('page', {
        tasks: writable(data),
        categories: writable(categoriesData)
    });

    const { tasks } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    $: viewedTaskId = $page.url.searchParams.get('id');
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

        changeSearchParams("id", result.data!);
    };

    const changeTab = (tab: string) => {
        changeSearchParams("tab", tab, { refetchData: true, removeOther: true });
    };

    $: {
        if (viewedTaskId !== null) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    $: title = viewedTaskId ? $tasks.find(t => t.id === Number(viewedTaskId))?.title : "Tâches";
</script>

<svelte:head>
    <title>{title} - Silicate</title>
</svelte:head>

<div class="relative w-full h-[calc(100%-40px)] flex flex-col justify-start gap-5 overflow-auto">
    <header class="relative w-full flex justify-start items-center">
        <h1 class="text-xl text-primary-950">Tâches {archived ? 'Archivées' : ''}</h1>
    </header>
    <Search />
    <Categories />
    <TaskList />
</div>
<menu class="fixed bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)]">
    <button class="border-b-2 {currentTab === '' ? 'border-primary-600' : 'border-transparent text-neutral-600'}" on:click={() => changeTab('')}> Tâches </button>
    <button
        class="relative bottom-[30px] h-[60px] aspect-square rounded-full bg-primary-600 text-neutral-50 flex justify-center items-center shadow-lg"
        on:click={add}
    >
        <IconPlus />
    </button>
    <button class="border-b-2 {currentTab === 'archives' ? 'border-primary-600' : 'border-transparent text-neutral-600'}" on:click={() => changeTab('archives')}>
        Archives
    </button>
</menu>
<TaskDetailsModal />
