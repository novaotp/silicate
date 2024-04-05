<script lang="ts">
    import type { Step, Task } from '$libs/models/Task';
    import { IconCheck } from '@tabler/icons-svelte';
    import { createEventDispatcher } from 'svelte';

    export let task: Task;

    $: ({ id, title, due, steps } = task);

    const dispatch = createEventDispatcher();
    const onClick = () => {
        dispatch('click', id);
    };

    const calculateCompletion = (values: string | Step[]): number => {
        if (typeof values === 'string') {
            values = JSON.parse(values) as Step[];
        }

        let completedCount = 0;
        const totalCount = values.length;

        for (const value of values) {
            if (value.subSteps) {
                completedCount += calculateCompletion(value.subSteps);
            } else {
                completedCount += value.completed ? 1 : 0;
            }
        }

        return completedCount / totalCount;
    };
</script>

<button class="relative w-full h-20 py-5 gap-[30px] flex justify-between items-start cursor-pointer text-black" on:click={onClick}>
    {#if due}
        {@const month = new Date(due).toLocaleDateString('fr-CH', { month: 'short' }).replace('.', '')}
        {@const day = new Date(due).toLocaleDateString('fr-CH', { day: '2-digit' })}
        <time class="relative h-full aspect-square flex flex-col justify-center items-center">
            <span class="text-gray-500 text-sm">{month}</span>
            <span class="text-xl font-medium text-blue-500">{day}</span>
        </time>
    {/if}
    <div class="relative flex-grow h-full flex flex-col justify-center items-start gap-[2px]">
        <h2 class="text-start font-medium text-black">{title}</h2>
        {#if due}
            {@const time = new Date(due).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' }).split(':').join('h')}
            <time class="text-sm text-gray-500">{time}</time>
        {:else}
            <time class="text-sm text-gray-500">Aucune date spécifiée</time>
        {/if}
    </div>
    {#if steps}
        {@const completion = Number((calculateCompletion(JSON.parse(steps)) * 100).toFixed(0))}
        <div class="relative h-full aspect-square flex justify-center items-center text-gray-500 bg-white rounded-full">
            <svg viewBox="0 0 36 36">
                <path
                    class="fill-none stroke-blue-500 stroke-2"
                    d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    stroke-dasharray="{completion}, 100"
                />
            </svg>
            {#if completion === 100}
                <span class="absolute text-sm"><IconCheck /></span>
            {:else}
                <span class="absolute text-sm">
                    {completion}
                </span>
            {/if}
        </div>
    {/if}
</button>
