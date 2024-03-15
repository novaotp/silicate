<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import type { Status } from "$libs/models/Task";
    import type { Task } from "$libs/models/Task";
    import type { ApiResponseWithData } from "$libs/types/ApiResponse";
    import TaskComponent from "./Task.svelte";

    export let tasks: Task[];
    export let statuses: Status[];

    $: search = $page.url.searchParams.get('search') ?? "";
    $: order = $page.url.searchParams.get('order') ?? "due-asc";
    $: category = $page.url.searchParams.get('category') ?? "All";
    $: status = $page.url.searchParams.get('status') ?? "All";

    const onValueChange = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks?search=${search}&order=${order}&category=${category}&status=${status}`);
        const { data: newTasks }: ApiResponseWithData<Task[]> = await response.json();
        tasks = newTasks;
    }
</script>

<select bind:value={status} on:change={onValueChange}>
    <option value="All">All</option>
    {#each statuses as status}
        <option>{status}</option>
    {/each}
</select>
<div class="flex flex-col gap-5">
    {#each tasks as task}
        <TaskComponent {task} />
    {:else}
        <p>Vous n'avez pas de tâches à réaliser en ce moment !</p>
    {/each}
</div>
