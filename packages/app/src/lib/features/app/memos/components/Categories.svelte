<script lang="ts">
    import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
    import { page } from '$app/stores';
	import { changeSearchParams } from '$utils/change-search-params';

    const categories = getContext<Writable<string[]>>('categories');

    $: undecodedCurrentCategory = $page.url.searchParams.get('category');
    $: currentCategory = undecodedCurrentCategory !== null ? decodeURIComponent(undecodedCurrentCategory) : '';

    const changeCategory = (newCategory: string) => {
        changeSearchParams('category', newCategory);
    };
</script>

<div role="list" class="relative w-full min-h-9 flex flex-nowrap items-center gap-2 overflow-scroll">
    <button
        class="relative h-full px-4 rounded text-sm {currentCategory === '' ? 'bg-primary-600 dark:bg-primary-500 text-neutral-50' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}"
        on:click={() => changeCategory('')}
    >
        Tout
    </button>
    {#each $categories as category}
        <button
            class="relative h-full px-4 rounded text-sm {currentCategory === category
                ? 'bg-primary-600 dark:bg-primary-500 text-neutral-50'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}"
            on:click={() => changeCategory(category)}
        >
            {category}
        </button>
    {/each}
</div>
