<script lang="ts">
    import View from '$/src/lib/tasks/View.svelte';
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
            <View {tasks} statuses={data.statuses} />
        {/await}
    {/if}
</main>
