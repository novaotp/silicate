<script lang="ts">
    import IconCircleXFilled from '@tabler/icons-svelte/icons/circle-x-filled';
    import IconSearch from '@tabler/icons-svelte/icons/search';
	import { createEventDispatcher } from 'svelte';

    export let placeholder: string;
    export let value: string;

    let internalValue: string = value;
    const dispatch = createEventDispatcher<{ search: string, reset: null }>();

    const resetSearch = () => {
        internalValue = "";
        dispatch('reset');
    }
</script>

<div
    role="search"
    class="relative w-full h-[50px] md:max-w-[350px] rounded flex justify-between items-center
            bg-neutral-100 text-neutral-700 dark:text-neutral-100 dark:bg-neutral-800"
>
    <input
        {placeholder}
        bind:value={internalValue}
        type="search"
        class="relative w-[calc(100%-80px)] h-full bg-transparent px-5 rounded-l text-sm"
    />
    {#if internalValue !== ''}
        <button on:click={resetSearch} class="relative size-10 flex justify-center items-center">
            <IconCircleXFilled />
        </button>
    {/if}
    <button on:click={() => dispatch('search', internalValue)} class="relative size-[50px] rounded-r flex justify-center items-center search-icon">
        <IconSearch class="size-5 text-neutral-600 dark:text-neutral-100" />
    </button>
</div>

<style>
    .search-icon::before {
        content: '';
        position: absolute;
        left: 0;
        margin: auto;
        height: 60%;
        width: 1px;
        background-color: gray;
    }
</style>
