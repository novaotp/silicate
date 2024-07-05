<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { Input } from "$lib/ui";
    import IconCircleXFilled from "@tabler/icons-svelte/IconCircleXFilled.svelte";
    import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";

    $: undecodedCurrentSearch = $page.url.searchParams.get('search');
    $: currentSearch = undecodedCurrentSearch !== null ? decodeURI(undecodedCurrentSearch) : '';

    const search = async () => {
        const searchParams = new URLSearchParams($page.url.searchParams);

        if (currentSearch === '') {
            searchParams.delete('search');
        } else {
            searchParams.set('search', encodeURI(currentSearch));
        }

        await goto(`/app/tasks?${searchParams}`, { invalidateAll: true });
    }

    const reset = () => {
        currentSearch = "";
        search();
    }
</script>

<div role="search" class="relative w-full md:max-w-[350px] h-[50px] rounded-lg flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700">
    <Input
        bind:value={currentSearch}
        type="search"
        placeholder="Recherche une tâche..."
        class="w-full"
    />
    {#if currentSearch !== ""}
        <button on:click={reset} class="relative min-h-[50px] min-w-[50px] flex justify-center items-center">
            <IconCircleXFilled class="text-neutral-600 dark:text-neutral-300" />
        </button>
    {/if}
    <button on:click={search} class="relative min-h-[50px] min-w-[50px] rounded-r-lg flex justify-center items-center search-icon">
        <IconSearch class="size-5 text-neutral-600 dark:text-neutral-300" />
    </button>
</div>

<style>
    .search-icon::after {
        content: "";
        position: absolute;
        left: 0;
        margin: auto;
        height: 60%;
        width: 1px;
        background-color: gray;
    }
</style>
