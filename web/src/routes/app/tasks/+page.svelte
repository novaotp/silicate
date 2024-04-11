<script lang="ts">
    import TasksPage from '$lib/components/tasks/TasksPage.svelte';
    import { Skeleton, Separator } from '$lib/ui';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Tâches - Silicate</title>
</svelte:head>

<main class="relative w-full h-full p-5 pt-0 flex flex-col justify-start">
    {#if data.data?.message || !data.tasks || !data.categories}
        <p>Une erreur est survenue lors du chargement.</p>
        <p>Erreur : {data.data?.message}</p>
    {:else}
        {#await data.tasks}
            <div class="relative w-full flex flex-col items-start gap-5">
                <Skeleton class="w-20 h-8" />
                <Skeleton class="w-full h-10" />
                <div class="relative w-full flex gap-2">
                    <Skeleton class="w-20 h-10" />
                    <Skeleton class="w-20 h-10" />
                </div>
                <div class="w-full flex flex-col">
                    <Skeleton class="w-20 h-8" />
                    {#each {length: 3} as _, i}
                        <div class="w-full h-20 py-5 flex gap-[30px]">
                            <Skeleton class="h-full aspect-square" />
                            <div class="flex-grow flex flex-col justify-between items-start">
                                <Skeleton class="w-40 h-5" />
                                <Skeleton class="w-20 h-4" />
                            </div>
                            <Skeleton class="h-full aspect-square rounded-[50%]" />
                        </div>
                        {#if i !== 2}
                            <Separator />
                        {/if}
                    {/each}
                </div>
                <div class="w-full flex flex-col">
                    <Skeleton class="w-20 h-8" />
                    {#each {length: 2} as _, i}
                        <div class="w-full h-20 py-5 flex gap-[30px]">
                            <Skeleton class="h-full aspect-square" />
                            <div class="flex-grow flex flex-col justify-between items-start">
                                <Skeleton class="w-40 h-5" />
                                <Skeleton class="w-20 h-4" />
                            </div>
                            <Skeleton class="h-full aspect-square rounded-[50%]" />
                        </div>
                        {#if i !== 1}
                            <Separator />
                        {/if}
                    {/each}
                </div>
            </div>
        {:then tasks}
            {#if tasks}
                <TasksPage data={tasks} categoriesData={data.categories} />
            {:else}
                <p>Une erreur est survenue lors du chargement des tâches.</p>
            {/if}
        {:catch}
            <p>Une erreur est survenue lors du chargement des tâches.</p>
        {/await}
    {/if}
</main>
