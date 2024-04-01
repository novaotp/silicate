<script lang="ts">
    import { IconFilter } from "@tabler/icons-svelte";
    import Category from "./Category.svelte";
    import { getCategories, getTasks } from "../types";
    import TaskComponent from "./TaskComponent.svelte";
    import TaskDetails from "./TaskDetails/TaskDetails.svelte";

    const tasks = getTasks();
    const categories = getCategories();

    let viewedTaskId: number | null = null;

    $: {
        if (viewedTaskId !== null) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    const onTaskClick = (event: CustomEvent<number>) => {
        viewedTaskId = event.detail;
    };
</script>

<header class="relative w-full flex justify-between items-center pb-5">
    <h1 class="text-xl">Tâches</h1>
    <button on:click class="flex gap-2">
        <span>Filtrer</span>
        <IconFilter />
    </button>
</header>
<div role="list" class="relative w-full flex gap-2">
    <Category value="">Tout</Category>
    {#each categories as category}
        <Category value={category}>{category}</Category>
    {/each}
</div>
<div role="list" class="flex flex-col divide-y-[1px] divide-gray-300 mb-5">
    {#each tasks as task}
        <TaskComponent bind:task on:click={onTaskClick} />        
    {:else}
        <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
    {/each}
</div>
<TaskDetails bind:id={viewedTaskId} />
