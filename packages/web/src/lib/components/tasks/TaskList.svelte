<script lang="ts">
    import { page } from '$app/stores';
    import IconCheck from '@tabler/icons-svelte/IconCheck.svelte';
    import IconArchive from '@tabler/icons-svelte/IconArchive.svelte';
    import { getContext } from 'svelte';
    import { calculateCompletion, changeSearchParams, type PageContext } from './utils';
    import type { Task } from '$libs/models/Task';
    import Categories from './Categories.svelte';

    const { tasks } = getContext<PageContext>('page');

    $: archived = $page.url.searchParams.get('tab') === 'archives';

    let groupedByYear: Record<number, Task[]> = {};
    let groupedByYear2: [string, Task[]][] = [];

    $: {
        groupedByYear = {};
        groupedByYear2 = [];
        $tasks.forEach((task) => {
            const year = new Date(task.due).getFullYear();

            if (Object.keys(groupedByYear).includes(year.toString())) {
                groupedByYear[year] = [...(groupedByYear[year] ?? []), task];
            } else {
                groupedByYear[year] = [task];
            }
        });
        groupedByYear2 = Object.entries(groupedByYear);
    }

    const showTask = (id: number) => {
        changeSearchParams('id', id);
    }
</script>

<div role="list" class="relative w-[min(100%,800px)] h-full mx-auto flex flex-col gap-5 mb-10">
    <Categories />
    {#if $tasks.length === 0}
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
    {:else}
        {#each groupedByYear2 as [year, tasks]}
            <div role="list" class="flex flex-col">
                {#if Object.keys(groupedByYear).length > 1 || year !== new Date().getFullYear().toString()}
                    <h2 class="text-xl text-neutral-950">{year}</h2>
                {/if}
                <div role="list" class="flex flex-col divide-y-[1px] divide-neutral-300">
                    {#each tasks as { id, title, due, steps } (id)}
                        <button
                            class="relative w-full h-20 py-4 gap-[30px] flex justify-between items-start cursor-pointer text-black"
                            on:click={() => showTask(id)}
                        >
                            {#if due}
                                {@const month = new Date(due).toLocaleDateString('fr-CH', { month: 'short' }).replace('.', '')}
                                {@const day = new Date(due).toLocaleDateString('fr-CH', { day: '2-digit' })}
                                <time class="relative h-full aspect-square flex flex-col justify-center items-center">
                                    <span class="text-neutral-500 text-sm">{month}</span>
                                    <span class="text-xl font-medium text-primary-600">{day}</span>
                                </time>
                            {/if}
                            <div class="relative flex-grow h-full flex flex-col justify-center items-start">
                                <h2 class="text-start font-medium text-primary-950 line-clamp-1">{title}</h2>
                                {#if due}
                                    {@const time = new Date(due)
                                        .toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })
                                        .split(':')
                                        .join('h')}
                                    <time class="text-sm text-neutral-500">{time}</time>
                                {:else}
                                    <time class="text-sm text-neutral-500">Aucune date spécifiée</time>
                                {/if}
                            </div>
                            {#if steps}
                                {@const completion = Number((calculateCompletion(JSON.parse(steps)) * 100).toFixed(0))}
                                <div class="relative h-full aspect-square flex justify-center items-center text-neutral-500 bg-accent-success-100 rounded-full">
                                    <svg viewBox="0 0 36 36">
                                        <path
                                            class="fill-none stroke-accent-success-500 stroke-2"
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
                    {/each}
                </div>
            </div>
        {/each}
    {/if}
</div>
