<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconEdit, IconTrashX, IconX } from '@tabler/icons-svelte';
    import { createEventDispatcher } from 'svelte';
    import { addToast } from '$stores/toast';
    import { formatDate } from '$utils/formatDate';
    import FullScreen from '../shared/FullScreen.svelte';
    import Row from './Row.svelte';
    import * as Header from '../shared/Header';
    import Main from '../shared/Main.svelte';

    export let tasks: Task[];
    /** The id of the task to show. */
    export let id: number | null;
    /** The state of the modal. */
    export let show: boolean;

    $: task = tasks.find((t) => t.id === id);

    $: {
        if (show) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    const dispatch = createEventDispatcher();

    const edit = () => dispatch('edit');
    const destroy = async () => {
        if (!task) return;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, { method: 'DELETE' });
        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        tasks = tasks.filter((t) => t.id !== task?.id);
        show = false;
    };
</script>

{#if show && task}
    <FullScreen>
        <Header.Root>
            <Header.Button on:click={() => (show = false)}><IconX /></Header.Button>
            <Header.Group>
                <Header.Button class="text-red-500 p-2" on:click={destroy}><IconTrashX /></Header.Button>
                <Header.Button class="bg-blue-600 text-white px-4 py-2" on:click={edit}><IconEdit /></Header.Button>
            </Header.Group>
        </Header.Root>
        <Main>
            <h2 class="relative w-full h-[50px] flex justify-between items-center text-xl text-black font-semibold">{task.title}</h2>
            <Row label="Priorité">{task.priority ?? 'Aucune'}</Row>
            <Row label="Statut">{task.status ?? 'Aucun'}</Row>
            <Row label="Catégorie">{task.category ?? 'Aucune'}</Row>
            <Row label="Échéance">{task.due ? formatDate(task.due) : 'Aucune échéance'}</Row>
            {#if task.description}
                <div class="relative w-full h-[200px] text-sm bg-gray-200 text-black p-5 rounded-lg">{task.description}</div>
            {/if}
        </Main>
    </FullScreen>
{/if}
