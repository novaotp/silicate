<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { IconPlus } from '@tabler/icons-svelte';

    $: currentTab = $page.url.searchParams.get("tab") ?? "";
</script>

<menu class="fixed bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)]">
    <button class="border-b-2 {currentTab === "" ? "border-blue-500" : "border-transparent"}" on:click={async () => await goto('/app/tasks')}>Tâches</button>
    <button class="relative bottom-1/2 h-[50px] aspect-square rounded-full bg-blue-500 text-white flex justify-center items-center shadow-lg">
        <IconPlus />
    </button>
    <button class="border-b-2 {currentTab === "projects" ? "border-blue-500" : "border-transparent"}" on:click={async () => await goto('/app/tasks?tab=projects')}>Projets</button>
</menu>
