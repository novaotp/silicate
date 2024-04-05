<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconCheck, IconChevronLeft, IconEdit, IconTrashX } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { type PageContext } from '../../types';
    import StepComponent from './View/StepComponent.svelte';
    import { fly } from 'svelte/transition';
    import View from './View/View.svelte';
    import Edit from './Edit.svelte';
    import { fetchTasks } from './utils';
    import { page } from '$app/stores';

    const { tasks } = getContext<PageContext>('page');

    const jwt = getContext<string>('jwt');

    /** The id of the task to show. */
    export let id: number | null;

    $: task = $tasks.find((t) => t.id === id);
    $: replica = task ? { ...task } : undefined;

    let isInEditingMode: boolean = false;
    $: EditIcon = isInEditingMode ? IconCheck : IconEdit;

    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    const back = () => {
        if (!isInEditingMode) {
            id = null;
            return;
        }

        const choice = window.confirm('Vous avez des changements non enregistrés. Souhaitez-vous continuer ?');

        if (choice) {
            isInEditingMode = false;
            id = null;
        }
    };

    const edit = async () => {
        if (!task || !replica) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour.' });
            return;
        }

        if (isInEditingMode) {
            if (replica.title.trimEnd() === '') {
                addToast({ type: 'info', message: 'Un titre est requis.' });
                return;
            }

            const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${replica.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: replica.title,
                    description: replica.description,
                    category: replica.category,
                    due: replica.due,
                    steps: replica.steps
                }),
                headers: {
                    accept: 'application/json',
                    authorization: jwt,
                    'content-type': 'application/json'
                }
            });
            const { success, message }: ApiResponse = await response.json();

            if (!success) {
                addToast({ type: 'error', message });
                return;
            } else {
                addToast({ type: 'success', message: 'Tâche modifiée avec succès.' });
            }

            const updatedTasks = await fetchTasks(jwt, category, search);

            if (!updatedTasks) {
                addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
                return;
            }

            $tasks = updatedTasks;
        }

        isInEditingMode = !isInEditingMode;
    };

    const destroy = async () => {
        if (!task || !replica) return;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                authorization: jwt
            }
        });
        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, category, search);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche supprimée avec succès.' });
        }

        isInEditingMode = false;
        $tasks = updatedTasks;
        id = null;
    };
</script>

{#if id !== null && task && replica}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100] overflow-auto" transition:fly={{ x: -100 }}>
        <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
            <button class="rounded-full" on:click={back}>
                <IconChevronLeft />
            </button>
            <div class="flex justify-between items-center gap-4">
                <button class="rounded-full text-red-500 py-2" on:click={destroy}>
                    <IconTrashX />
                </button>
                <button class="rounded-full bg-blue-500 text-white px-4 py-2" on:click={edit}>
                    <svelte:component this={EditIcon} />
                </button>
            </div>
        </header>
        <div class="relative w-full h-full flex flex-col justify-start items-start">
            {#if isInEditingMode}
                <Edit task={replica} />
            {:else}
                <View bind:task />
            {/if}
        </div>
    </div>
{/if}
