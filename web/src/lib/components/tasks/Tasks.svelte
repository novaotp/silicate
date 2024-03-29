<script lang="ts">
    import { getContext } from 'svelte';
    import type { PageContext } from './types';
    import type { Task } from '$libs/models/Task';
    import { IconCalendarClock, IconClock } from '@tabler/icons-svelte';

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
            class="relative w-full flex flex-col justify-between items-start shadow-[0_0px_6px_rgba(0,0,0,0.25)] rounded-lg cursor-pointer text-white"
            on:click={() => onTaskClick(task)}
        >
            {#if priority || status || category}
                <div class="flex flex-wrap gap-[10px] px-5 pt-5">
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
            <div class="flex flex-col px-5 py-[15px] gap-[2px]">
                <h2 class="font-medium text-start text-black">{title}</h2>
                {#if description}
                    <p class="text-sm text-start line-clamp-3 text-gray-500">{description}</p>
                {/if}
            </div>
            {#if due}
                {@const date = new Date(due).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
                {@const time = new Date(due).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' }).split(':').join('h')}
                <time class="flex justify-between items-center gap-[10px] text-gray-500 bg-white rounded-full text-sm px-5 pb-5">
                    <IconCalendarClock class="size-6" />
                    <span>{date}, {time}</span>
                </time>
            {/if}
        </button>
    {:else}
        <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
    {/each}
</div>
