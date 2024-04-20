<script lang="ts">
    import { setContext } from "svelte";
    import type { PageContext } from "./utils";
    import { writable } from "svelte/store";
    import type { Task } from "$libs/models/Task";

    export let tasks: Task[];
    export let categories: string[];

    setContext<PageContext>('page', {
        tasks: writable(tasks),
        categories: writable(categories),
        viewedTaskId: writable(null)
    });
</script>

<slot />
