<script lang="ts">
    import Category from './Category.svelte';
    import { type PageContext } from '../types';
    import TaskComponent from './TaskComponent.svelte';
    import TaskDetails from './TaskDetails/TaskDetails.svelte';
    import Search from './Search.svelte';
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import { IconArchive, IconChevronLeft } from '@tabler/icons-svelte';
    import { fly } from 'svelte/transition';

    const { tasks, categories } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    export let viewedTaskId: number | null;

    $: archived = $page.url.searchParams.get("tab") === "archives";

    $: {
        if (viewedTaskId !== null) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    const onTaskClick = (event: CustomEvent<number>) => {
        viewedTaskId = event.detail;
    };

    const controller = new AbortController();
    const signal = controller.signal;
    const fetchTask = async (id: number) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt
            },
            signal
        });
        const result: ApiResponseWithData<Task> = await response.json();

        return result.success ? result.data : undefined;
    };

    const onEarlyBack = () => {
        viewedTaskId = null;
        controller.abort();
    }
</script>

<div class="relative w-full h-full flex flex-col justify-start gap-5">
    <header class="relative w-full flex justify-start items-center">
        <h1 class="text-xl">Tâches {archived ? "Archivées" : ""}</h1>
    </header>
    <Search />
    <div role="list" class="relative w-full flex gap-2">
        <Category value="">Tout</Category>
        {#each categories as category}
            <Category value={category}>{category}</Category>
        {/each}
    </div>
    <div role="list" class="flex flex-col divide-y-[1px] divide-gray-300 mb-5">
        {#each $tasks as task}
            <TaskComponent bind:task on:click={onTaskClick} />
        {:else}
            {#if $page.url.searchParams.get('search') !== null}
                <p>Aucune tâche ne correspond à ta recherche.</p>
            {:else if archived}
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center gap-5">
                    <IconArchive class="size-20" />
                    <p class="text-center">Vos tâches archivées s'afficheront ici.</p>
                </div>
            {:else}
                <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
            {/if}
        {/each}
    </div>
</div>
{#if viewedTaskId}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100] overflow-auto" transition:fly={{ x: -100 }}>
        {#await fetchTask(viewedTaskId)}
            <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                <button class="rounded-full" on:click={onEarlyBack}>
                    <IconChevronLeft />
                </button>
            </header>
            <div class="relative w-full h-full flex justify-center items-center px-5">
                <p>Chargement de la tâche...</p>
            </div>
        {:then task}
            {#if task}
                <TaskDetails {task} on:close={() => (viewedTaskId = null)} />
            {:else}
                <p>Une erreur est survenue.</p>
            {/if}
        {/await}
    </div>
{/if}
