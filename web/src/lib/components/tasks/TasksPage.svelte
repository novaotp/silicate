<script lang="ts">
    import type { Task } from '$libs/models/Task';
    import { setContext } from 'svelte';
    import type { PageContext } from './types';
    import { writable } from 'svelte/store';
    import Tabs from './Tabs.svelte';
    import { page } from '$app/stores';
    import Tasks from './Tasks/Tasks.svelte';

    export let tasks: Task[];
    export let categories: string[];

    let viewedTaskId: number | null = null;

    setContext<PageContext>('page', {
        tasks: writable(tasks),
        categories
    });

    $: currentTab = $page.url.searchParams.get("tab") ?? "";
</script>

{#if currentTab === ""}
    <Tasks bind:viewedTaskId />
{:else}
    <div class="relative w-full h-full flex justify-center items-center">
        <p class="text-center">Cette fonctionnalité n'est pas encore disponible.</p>
    </div>
{/if}
<Tabs bind:viewedTaskId />
