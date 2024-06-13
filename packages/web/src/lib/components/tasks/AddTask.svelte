<script lang="ts">
    import IconPlus from '@tabler/icons-svelte/IconPlus.svelte';
    import { addTask } from './TasksPage';
    import { getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { changeSearchParams, fetchTasks, type PageContext } from './utils';
    import { page } from '$app/stores';

    const jwt = getContext<string>('jwt');
    const { tasks } = getContext<PageContext>('page');

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

        changeSearchParams('id', result.data!);
    };
</script>

<button
    class="relative bottom-[30px] h-[60px] aspect-square rounded-full bg-primary-600 text-neutral-50 flex justify-center items-center shadow-lg"
    on:click={add}
>
    <IconPlus />
</button>
