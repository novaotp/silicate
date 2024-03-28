<script lang="ts">
    import type { Category, Priority, Status } from '$libs/models/Task';
    import type { Task } from '$libs/models/Task';
    import Filters from './Filters/Filters.svelte';
    import NewTask from './FullScreenModals/NewTask/NewTask.svelte';
    import EditTask from './FullScreenModals/EditTask/EditTask.svelte';
    import ViewTask from './FullScreenModals/ViewTask/ViewTask.svelte';
    import { setContext } from 'svelte';
    import type { PageContext } from './types';
    import Header from './Header.svelte';
    import { writable } from 'svelte/store';
    import Tasks from './Tasks.svelte';

    export let tasks: Task[];
    export let statuses: Status[];
    export let priorities: Priority[];
    export let categories: Category[];
    export let selectedStatuses: Status[];
    export let selectedPriorities: Priority[];

    setContext<PageContext>('page', {
        tasks: writable(tasks),
        statuses,
        priorities,
        categories,
        selected: {
            statuses: selectedStatuses,
            priorities: selectedPriorities
        }
    });

    let showFilters: boolean = false;
    let showViewTask: boolean = false;
    let showEditTask: boolean = false;
    let editedTask: number | null = null;

    const onEdit = () => {
        showViewTask = false;
        showEditTask = true;
    };
</script>

<Header on:click={() => (showFilters = !showFilters)} />
<Filters show={showFilters} on:close={() => (showFilters = !showFilters)} />
<Tasks bind:editedTask bind:showViewTask />
<NewTask on:click={() => (showFilters = false)} />
<ViewTask id={editedTask} bind:show={showViewTask} on:edit={onEdit} />
<EditTask id={editedTask} bind:show={showEditTask} />
