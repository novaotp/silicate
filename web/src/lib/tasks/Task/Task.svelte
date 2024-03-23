<script lang="ts">
    import type { Task } from '$libs/models/Task';
    import { IconClock } from '@tabler/icons-svelte';
    import Tag from './Tag.svelte';
    import { createEventDispatcher } from 'svelte';

    export let task: Task;

    $: ({ priority, status, category, title, description, due } = task);

    const dispatch = createEventDispatcher();
</script>

<button class="relative w-full p-5 flex flex-col justify-between items-start bg-blue-950 rounded-lg text-white gap-3" on:click={() => dispatch("click")}>
    {#if priority || status || category}
        <div class="flex gap-2">
            {#if priority}
                <Tag
                    type="priority"
                    value={priority}
                />
            {/if}
            {#if status}
                <Tag
                    type="status"
                    value={status}
                />
            {/if}
            {#if category}
                <Tag
                    type="category"
                    value={category}
                />
            {/if}
        </div>
    {/if}
    <h2 class="font-semibold text-start">{title}</h2>
    {#if description}
        <p class="text-sm text-start">{description}</p>
    {/if}
    {#if due}
        {@const formattedDate = new Date(due).toLocaleString('fr-CH', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        <time class="flex justify-between items-center gap-2 bg-white text-black rounded-full text-sm px-3 py-1">
            <IconClock class="size-4" />
            <span>{formattedDate}</span>
        </time>
    {/if}
</button>
