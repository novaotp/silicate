<script lang="ts">
    import Category from './Category.svelte';
    import { type PageContext } from '../types';
    import TaskComponent from './TaskComponent.svelte';
    import TaskDetails from './TaskDetails/TaskDetails.svelte';
    import Search from './Search.svelte';
    import { page } from '$app/stores';
    import { getContext } from 'svelte';

    const { tasks, categories } = getContext<PageContext>("page");

    export let viewedTaskId: number | null;

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
</script>

<div class="relative w-full h-full flex flex-col justify-start gap-5">
    <header class="relative w-full flex justify-start items-center">
        <h1 class="text-xl">Tâches</h1>
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
            {#if $page.url.searchParams.get("search") !== null}
                <p>Aucune tâche ne correspond à ta recherche.</p>
            {:else}
                <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
            {/if}
        {/each}
    </div>
</div>
<TaskDetails bind:id={viewedTaskId} />
