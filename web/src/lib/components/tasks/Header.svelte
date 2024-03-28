<script lang="ts">
    import { IconFilter } from '@tabler/icons-svelte';
</script>

<header class="relative w-full flex justify-between items-center pb-5">
    <h1 class="text-xl">Tâches</h1>
    <button on:click class="flex gap-2">
        <span>Filtrer</span>
        <IconFilter />
    </button>
</header>
