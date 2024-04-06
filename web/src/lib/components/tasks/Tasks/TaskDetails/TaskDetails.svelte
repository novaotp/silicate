<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconChevronLeft, IconDotsVertical } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { type PageContext } from '../../types';
    import { fetchTasks } from './utils';
    import { page } from '$app/stores';
    import type { Task } from '$libs/models/Task';
    import Settings from './Settings.svelte';
    import { Attachments, Category, Description, Due, Steps } from './View';

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

    const back = () => {
        controller.abort();
        dispatch('close');
    };

    const edit = async () => {
        if (title.trimEnd() === '') {
            addToast({ type: 'info', message: 'Un titre est requis.' });
            return;
        }

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title,
                description: description,
                category: category,
                due: due
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

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };

    const destroy = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
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

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche supprimée avec succès.' });
        }

        $tasks = updatedTasks;
        dispatch('close');
    };

    const archive = async () => {
        archived = !archived;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                archived: archived
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

<svelte:head>
    <title>{title} - Silicate</title>
</svelte:head>

<header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] glass">
    <button class="rounded-full" on:click={back}>
        <IconChevronLeft />
    </button>
    <button class="py-2" on:click={() => (showSettings = !showSettings)}>
        <IconDotsVertical />
    </button>
</header>
<div class="relative w-full h-full flex flex-col justify-start items-start">
    <div class="relative px-5 pt-20 pb-5 w-full flex flex-col items-start gap-5 text-black">
        <h2 class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium">{title}</h2>
        <Category bind:value={category} />
        <Due bind:value={due} />
        {#if description}
            <Description bind:value={description} on:edit={async () => await edit()} />
        {/if}
        <Attachments {id} bind:value={attachments} {signal} />
        <Steps {id} bind:value={steps} />
    </div>
</div>
<Settings show={showSettings} archived={archived} on:close={() => (showSettings = !showSettings)} on:destroy={destroy} on:archive={archive} />

<style lang="scss">
    $blur: 10px;

    .glass {
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur($blur);
        -webkit-backdrop-filter: blur($blur);
    }
</style>
