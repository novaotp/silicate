<script lang="ts">
    import TasksPage from '$lib/components/tasks/TasksPage.svelte';
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
            <p>Chargement des tâches...</p>
        {:then tasks}
            {#if tasks}
                <TasksPage {tasks} categories={data.categories} />
            {/if}
        {:catch}
            <p>Une erreur est survenue lors du chargment des tâches.</p>
        {/await}
    {/if}
</main>
