<script lang="ts">
    import type { Category, Priority, Status } from '$libs/models/Task';
    import type { Task } from '$libs/models/Task';
    import { IconFilter } from '@tabler/icons-svelte';
    import TaskComponent from './Task/Task.svelte';
    import Filters from './Filters/Filters.svelte';
    import NewTask from './FullScreenModals/NewTask/NewTask.svelte';
    import EditTask from './FullScreenModals/EditTask/EditTask.svelte';
    import ViewTask from './FullScreenModals/ViewTask/ViewTask.svelte';

    export let tasks: Task[];
    export let statuses: Status[];
    export let priorities: Priority[];
    export let categories: Category[];
    export let selectedStatuses: Status[];
    export let selectedPriorities: Priority[];

    let loadingData: boolean = false;
    let showFilters: boolean = false;
    let showViewTask: boolean = false;
    let showEditTask: boolean = false;
    let editedTask: number | null = null;
</script>

<header class="relative w-full flex justify-between items-center pb-5">
    <h1 class="text-xl">Tâches</h1>
    <button
        on:click={() => (showFilters = !showFilters)}
        class="flex gap-2"
    >
        <span>Filtrer</span>
        <IconFilter />
    </button>
</header>
<Filters
    bind:loadingData
    bind:tasks
    bind:selectedStatuses
    bind:selectedPriorities
    {statuses}
    {priorities}
    {categories}
    {showFilters}
/>
{#if loadingData}
    <p>Chargement des données...</p>
{:else}
<ul class="flex flex-col gap-5 mb-5">
    {#each tasks as task}
        <TaskComponent {task} on:click={() => {
            editedTask = task.id;
            showViewTask = true;
        }} />
    {:else}
        <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
    {/each}
</ul>
{/if}
<NewTask
    on:click={() => (showFilters = false)}
    bind:tasks
    {statuses}
    {priorities}
    {categories}
/>
<ViewTask
    id={editedTask}
    bind:show={showViewTask}
    bind:tasks
    on:edit={() => {
        showViewTask = false;
        showEditTask = true;
    }}
/>
<EditTask
    id={editedTask}
    bind:show={showEditTask}
    bind:tasks
    {statuses}
    {priorities}
    {categories}
/>