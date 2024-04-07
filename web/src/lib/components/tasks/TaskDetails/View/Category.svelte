<script lang="ts">
    import { IconTag } from '@tabler/icons-svelte';

    export let value: string | null;
</script>

{#if value}
    <div class="relative w-full flex justify-between">
        <div class="relative flex items-center gap-4 text-gray-500">
            <IconTag />
            <span>Catégorie</span>
        </div>
        <span>{value}</span>
    </div>
{/if}
