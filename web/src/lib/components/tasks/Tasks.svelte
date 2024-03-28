<script lang="ts">
    import { getContext } from 'svelte';
    import type { PageContext } from './types';
    import type { Task } from '$libs/models/Task';
    import { IconClock } from '@tabler/icons-svelte';

    export let editedTask: number | null;
    export let showViewTask: boolean;

    const { tasks } = getContext<PageContext>('page');

    const onTaskClick = (task: Task) => {
        editedTask = task.id;
        showViewTask = true;
    };
</script>

<div role="list" class="flex flex-col gap-5 mb-5">
    {#each $tasks as task}
        {@const { priority, status, category, title, description, due } = task}
        <button
            class="relative w-full p-5 flex flex-col justify-between items-start bg-blue-950 rounded-lg text-white gap-3"
            on:click={() => onTaskClick(task)}
        >
            {#if priority || status || category}
                <div class="flex gap-2">
                    <div class="{priority ? 'block' : 'hidden'} relative px-3 py-1 text-sm bg-red-500 rounded-full text-white">
                        {priority}
                    </div>
                    <div class="{status ? 'block' : 'hidden'} relative px-3 py-1 text-sm bg-green-600 rounded-full text-white">
                        {status}
                    </div>
                    <div class="{category ? 'block' : 'hidden'} relative px-3 py-1 text-sm bg-blue-500 rounded-full text-white">
                        {category}
                    </div>
                </div>
            {/if}
            <h2 class="font-semibold text-start">{title}</h2>
            {#if description}
                <p class="text-sm text-start">{description}</p>
            {/if}
            {#if due}
                {@const formattedDate = new Date(due).toLocaleString('fr-CH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                <time class="flex justify-between items-center gap-2 bg-white text-black rounded-full text-sm px-3 py-1">
                    <IconClock class="size-4" />
                    <span>{formattedDate}</span>
                </time>
            {/if}
        </button>
    {:else}
        <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
    {/each}
</div>
