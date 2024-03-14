<script lang="ts">
    import Task from '$lib/tasks/Task.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Tâches - Silicate</title>
</svelte:head>

<main class="relative w-full h-full p-5">
    {#if data.data?.dbError || !data.tasks}
        <p>Une erreur est survenue : {data.data.dbError}</p>
    {:else}
        {#await data.tasks}
            <p>Chargement des tâches...</p>
        {:then tasks}
            <div class="flex flex-col gap-5">
                {#each tasks as task}
                    <Task {task} />
                {:else}
                    <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
                {/each}
            </div>
        {/await}
    {/if}
</main>
