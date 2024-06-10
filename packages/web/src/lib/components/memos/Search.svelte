<script lang="ts">
    import { page } from '$app/stores';
    import { IconCircleXFilled, IconSearch } from '@tabler/icons-svelte';
    import { changeSearchParams } from './utils';

    const search = async () => {
        changeSearchParams('search', currentSearch, { refetchData: true });
    };

    $: undecodedCurrentSearch = $page.url.searchParams.get('search');
    $: currentSearch = undecodedCurrentSearch !== null ? decodeURI(undecodedCurrentSearch) : '';
</script>

<div role="search" class="relative w-full h-10 rounded flex justify-between items-center bg-neutral-100 text-neutral-700">
    <input
        bind:value={currentSearch}
        type="search"
        placeholder="Recherche un mémo..."
        class="relative w-[calc(100%-80px)] h-full bg-transparent px-5 rounded-l-lg text-sm"
    />
    {#if currentSearch !== ''}
        <button on:click={() => (currentSearch = '')} class="relative size-10 flex justify-center items-center">
            <IconCircleXFilled />
        </button>
    {/if}
    <button on:click={search} class="relative size-10 rounded-r-lg flex justify-center items-center search-icon">
        <IconSearch class="size-5 text-neutral-600" />
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
