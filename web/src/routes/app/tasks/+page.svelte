<script lang="ts">
    import TasksPage from '$lib/components/tasks/TasksPage.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Tâches - Silicate</title>
</svelte:head>

<main class="relative w-full h-full p-5 pt-0">
    {#if data.data?.dbError || !data.tasks}
        <p>Une erreur est survenue.</p>
    {:else}
        {#await data.tasks}
            <p>Chargement des tâches...</p>
        {:then tasks}
            <TasksPage
                {tasks}
                statuses={data.statuses}
                priorities={data.priorities}
                categories={data.categories}
                selectedStatuses={data.selectedStatuses}
                selectedPriorities={data.selectedPriorities}
            />
        {/await}
    {/if}
</main>
