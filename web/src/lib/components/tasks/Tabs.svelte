<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { IconPlus } from '@tabler/icons-svelte';
    import { fetchTasks } from './Tasks/TaskDetails/utils';
    import { addToast } from '$lib/stores/toast';
    import { getContext } from 'svelte';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { PageContext } from './types';

    export let viewedTaskId: number | null;

    const { tasks } = getContext<PageContext>('page');

    const jwt = getContext<string>('jwt');

    $: currentTab = $page.url.searchParams.get('tab') ?? '';
    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    const add = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                title: 'Ma nouvelle tâche',
                description: null,
                category: null,
                due: new Date(),
                steps: null
            }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });
        const result: ApiResponseWithData<number> = await response.json();

        if (!result.success) {
            addToast({ type: 'error', message: result.message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche ajoutée avec succès.' });
        }

        const updatedTasks = await fetchTasks(jwt, category, search);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
        viewedTaskId = result.data;
    };
</script>

<menu class="fixed bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)]">
    <button class="border-b-2 {currentTab === '' ? 'border-blue-500' : 'border-transparent'}" on:click={async () => await goto('/app/tasks')}>
        Tâches
    </button>
    <button class="relative bottom-1/2 h-[50px] aspect-square rounded-full bg-blue-500 text-white flex justify-center items-center shadow-lg" on:click={add}>
        <IconPlus />
    </button>
    <button
        class="border-b-2 {currentTab === 'projects' ? 'border-blue-500' : 'border-transparent'}"
        on:click={async () => await goto('/app/tasks?tab=projects')}
    >
        Projets
    </button>
</menu>
