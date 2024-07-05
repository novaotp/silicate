<script lang="ts">
    import TaskContextProvider from '$lib/components/tasks/TaskContextProvider.svelte';
    import { Skeleton, Separator } from '$lib/ui';
    import type { PageData } from './$types';
    import { PUBLIC_APP_NAME } from '$env/static/public';

    export let data: PageData;
</script>

<svelte:head>
    <title>Tâches - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Ne manque plus jamais une deadline ou une session d'étude importante.
        Définis des rappels, reçois des notifications et priorise efficacement tes tâches.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<div class="relative w-full h-full flex flex-col justify-start">
    {#if data.data?.message || !data.tasks || !data.categories}
        <p class="dark:text-neutral-50">Une erreur est survenue lors du chargement.</p>
        <p class="dark:text-neutral-50">Erreur : {data.data?.message}</p>
    {:else}
        {#await data.tasks}
            <div class="relative w-full flex flex-col items-start gap-5 px-5">
                <Skeleton class="w-20 h-8" />
                <Skeleton class="w-full h-10" />
                <div class="relative w-full flex gap-2">
                    <Skeleton class="w-20 h-10" />
                    <Skeleton class="w-20 h-10" />
                </div>
                <div class="w-full flex flex-col">
                    <Skeleton class="w-20 h-8" />
                    {#each { length: 3 } as _, i}
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
                    {#each { length: 2 } as _, i}
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
                <TaskContextProvider {tasks} categories={data.categories} />
            {:else}
                <p class="dark:text-neutral-50">Une erreur est survenue lors du chargement des tâches.</p>
            {/if}
        {:catch}
            <p class="dark:text-neutral-50">Une erreur est survenue lors du chargement des tâches.</p>
        {/await}
    {/if}
</div>
