<script lang="ts">
    import type { Task } from '$libs/models/Task';
    import Category from './Category.svelte';
    import Due from './Due.svelte';
    import Description from './Description.svelte';
    import Steps from './Steps.svelte';
    import Attachments from './Attachments.svelte';

    export let task: Task;
    $: ({ id, title, description, category, due, steps, attachments } = task);
</script>

<div class="relative px-5 pt-20 pb-5 w-full flex flex-col items-start gap-5 text-black">
    <h2 class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium">{task.title}</h2>
    <Category value={category} />
    <Due value={due} />
    <Description value={description} />
    <Attachments {id} bind:value={attachments} />
    {#if steps}
        {#key id}
            <Steps {id} bind:value={steps} />
        {/key}
    {/if}
</div>
