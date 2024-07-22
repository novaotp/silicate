<script lang="ts">
    import { page } from '$app/stores';
    import { changeSearchParams } from '$utils/change-search-params';
    import IconCircleXFilled from '@tabler/icons-svelte/icons/circle-x-filled';
    import IconSearch from '@tabler/icons-svelte/icons/search';

    const search = async () => {
        changeSearchParams('search', currentSearch, { invalidateAll: true });
    };

    const reset = async () => {
        currentSearch = '';
        await search();
    }

    $: undecodedCurrentSearch = $page.url.searchParams.get('search');
    $: currentSearch = undecodedCurrentSearch !== null ? decodeURI(undecodedCurrentSearch) : '';
</script>

<div role="search" class="relative w-full h-[50px] md:max-w-[350px] rounded flex justify-between items-center bg-neutral-100 text-neutral-700 dark:text-neutral-100 dark:bg-neutral-800">
    <input
        bind:value={currentSearch}
        type="search"
        placeholder="Recherche un mémo..."
        class="relative w-[calc(100%-80px)] h-full bg-transparent px-5 rounded-l text-sm"
    />
    {#if currentSearch !== ''}
        <button on:click={reset} class="relative size-10 flex justify-center items-center">
            <IconCircleXFilled />
        </button>
    {/if}
    <button on:click={search} class="relative size-[50px] rounded-r flex justify-center items-center search-icon">
        <IconSearch class="size-5 text-neutral-600 dark:text-neutral-100" />
    </button>
</div>

<style>
    .search-icon::after {
        content: '';
        position: absolute;
        left: 0;
        margin: auto;
        height: 60%;
        width: 1px;
        background-color: gray;
    }
</style>
