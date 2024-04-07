<script lang="ts">
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconArchive, IconArchiveOff, IconTrash } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { type PageContext } from '../types';
    import { page } from '$app/stores';
    import type { Task } from '$libs/models/Task';
    import { Attachments, Category, Description, Due, Steps } from './View';
    import { fetchTasks } from '../utils';
    import * as Utils from './TaskDetails';
    import { fly } from 'svelte/transition';
    import FullScreen from '$lib/components/shared/FullScreen.svelte';

    const { tasks } = getContext<PageContext>('page');

    const jwt = getContext<string>('jwt');

    const dispatch = createEventDispatcher();

    export let task: Task;

    let replica: Task = { ...task };
    $: ({ id, title, description, category, due, steps, attachments, archived } = replica);

    let showSettings: boolean = false;

    $: categorySearchParams = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';
    $: archivedSearchParam = $page.url.searchParams.get('tab') === 'archives';

    const controller = new AbortController();
    const signal = controller.signal;

    const edit = async () => {
        if (title.trimEnd() === '') {
            addToast({ type: 'info', message: 'Un titre est requis.' });
            return;
        }

        const { success, message } = await Utils.edit(id, jwt, { title, description, due, category });

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };

    const destroy = async () => {
        const { success, message } = await Utils.destroy(id, jwt);

        if (!success) {
            addToast({ type: 'error', message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche supprimée avec succès.' });
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
        dispatch('close');
    };

    const archive = async () => {
        archived = !archived;

        const { success, message }: ApiResponse = await Utils.archive(id, jwt, archived);

        if (!success) {
            addToast({ type: 'error', message });
            return;
        } else {
            const message = archived ? 'Tâche archivée et retirée' : 'Archivage annulée';
            addToast({ type: 'success', message: message });
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archivedSearchParam);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };
</script>

<div class="relative w-full h-full flex flex-col justify-start items-start">
    <div class="relative px-5 pt-20 pb-5 w-full flex flex-col items-start gap-5 text-black">
        <input bind:value={title} on:input={edit} class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium" />
        <Category bind:value={category} />
        <Due bind:value={due} />
        {#if description}
            <Description bind:value={description} on:edit={edit} />
        {/if}
        <Attachments {id} bind:value={attachments} {signal} />
        <Steps {id} bind:value={steps} />
    </div>
</div>
{#if showSettings}
    <FullScreen on:click={() => dispatch('close')} class="flex justify-center items-end">
        <div role="dialog" class="fixed w-full rounded-md flex flex-col shadow-2xl bg-white" transition:fly={{ y: 50 }}>
            <button on:click={destroy} class="relative w-full px-5 h-14 flex justify-start items-center gap-10">
                <IconTrash />
                <span>Supprimer</span>
            </button>
            <button on:click={archive} class="relative w-full px-5 h-14 flex justify-start items-center gap-10">
                {#if archived}
                    <IconArchiveOff />
                    <span>Retirer de l'archive</span>
                {:else}
                    <IconArchive />
                    <span>Archiver</span>
                {/if}
            </button>
        </div>
    </FullScreen>
{/if}
