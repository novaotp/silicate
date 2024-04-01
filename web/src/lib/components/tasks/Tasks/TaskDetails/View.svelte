<script lang="ts">
    import type { Task } from '$libs/models/Task';
    import { IconCalendarClock } from '@tabler/icons-svelte';
    import { calculateCompletion } from './utils';

    export let task: Task;
</script>

<div class="relative px-5 pt-20 pb-5 w-full flex flex-col items-start gap-5 custom-bg text-white">
    <h2 class="relative w-full flex justify-between items-center bg-transparent text-xl font-medium">{task.title}</h2>
    {#if task.description}
        <div class="relative inline-block w-full text-sm bg-transparent text-justify line-clamp-5 rounded-lg resize-none overflow-hidden">
            {task.description}
        </div>
    {/if}
    {#if task.steps}
        {@const progression = (calculateCompletion(task.steps) * 100).toFixed(0)}
        <div class="relative w-full flex flex-col p-5 rounded-lg border border-gray-300 gap-2">
            <div class="flex justify-between text-sm">
                <h3>Progression</h3>
                <span>{progression}%</span>
            </div>
            <div class="relative w-full h-1 rounded-full bg-black">
                <div class="relative h-full bg-yellow-400 duration-200 ease-in-out" style="width: {progression}%;"></div>
            </div>
        </div>
    {/if}
    {#if task.due}
        {@const date = new Date(task.due).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
        {@const time = new Date(task.due).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' }).split(':').join('h')}
        <time class="flex gap-5 items-center px-4 py-2 text-sm bg-red-500 text-white rounded-full">
            <IconCalendarClock class="size-6" />
            <span>{date}, {time}</span>
        </time>
    {/if}
</div>

<style>
    .custom-bg {
        background: rgb(134, 41, 238);
        background: linear-gradient(45deg, rgba(134, 41, 238, 1) 0%, rgba(102, 66, 155, 1) 35%, rgba(20, 31, 82, 1) 100%);
    }
</style>
