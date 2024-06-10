<script lang="ts">
    import { IconPlus } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { type PageContext } from './utils';
    import { replace, querystring } from "svelte-spa-router";
    import { createTask, getTasks } from '$/lib/requests/tasks';

    const { tasks, viewedTaskId } = getContext<PageContext>('page');

    $: urlSearchParams = new URLSearchParams($querystring);
    $: archived = urlSearchParams.get('tab') === 'archives';
    $: category = urlSearchParams.get('category') ?? '';
    $: search = urlSearchParams.get('search') ?? '';

    const add = async () => {
        const result = await createTask();

        if (!result.success) {
            addToast({ type: 'error', message: result.message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche ajoutée avec succès.' });
        }

        const updatedTaskResults = await getTasks(category, search, archived);

        if (!updatedTaskResults.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTaskResults.data;
        $viewedTaskId = result.data;
    };
</script>

<button
    class="relative bottom-[30px] h-[60px] aspect-square rounded-full bg-primary-600 text-neutral-50 flex justify-center items-center shadow-lg"
    on:click={add}
>
    <IconPlus />
</button>
