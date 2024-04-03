<script lang="ts">
    import { IconNotes } from "@tabler/icons-svelte";

    export let value: string | null;
</script>

{#if value}
<div class="relative w-full flex flex-col gap-3 text-gray-500">
    <div class="flex gap-4">
        <IconNotes />
        <span>Description</span>
    </div>
    <div class="relative w-full flex flex-col p-5 rounded-lg border border-gray-300 text-black text-sm">
        {value}
    </div>
</div>
{/if}
