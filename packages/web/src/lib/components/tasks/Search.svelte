<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import IconCircleXFilled from "@tabler/icons-svelte/IconCircleXFilled.svelte";
    import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";

    const search = async () => {
        const searchParams = new URLSearchParams($page.url.searchParams);

        if (currentSearch === '') {
            searchParams.delete('search');
        } else {
            searchParams.set('search', encodeURI(currentSearch));
        }

        await goto(`/app/tasks?${searchParams}`, { invalidateAll: true });
    }

    $: undecodedCurrentSearch = $page.url.searchParams.get('search');
    $: currentSearch = undecodedCurrentSearch !== null ? decodeURI(undecodedCurrentSearch) : '';
</script>

<div role="search" class="relative w-full h-10 rounded flex justify-between items-center bg-neutral-100 text-neutral-700">
    <input
        bind:value={currentSearch}
        type="search"
        placeholder="Recherche une tâche..."
        class="relative w-[calc(100%-80px)] h-full bg-transparent px-5 rounded-l text-sm"
    />
    {#if currentSearch !== ""}
        <button on:click={() => (currentSearch = "")} class="relative size-10 flex justify-center items-center">
            <IconCircleXFilled />
        </button>
    {/if}
    <button on:click={search} class="relative size-10 rounded-r flex justify-center items-center search-icon">
        <IconSearch class="size-5 text-neutral-600" />
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
