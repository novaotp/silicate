<script lang="ts">
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';

    const { categories } = getContext<MemoPageContext>('page');

    $: undecodedCurrentCategory = $page.url.searchParams.get('category');
    $: currentCategory = undecodedCurrentCategory !== null ? decodeURI(undecodedCurrentCategory) : '';

    const changeCategory = (newCategory: string) => {
        changeSearchParams('category', newCategory, { refetchData: true });
    };
</script>

<div role="list" class="relative min-h-10 w-full flex flex-nowrap items-center gap-2 overflow-scroll">
    <button
        class="relative px-4 py-2 rounded text-sm {currentCategory === '' ? 'bg-primary-600 text-neutral-50' : 'bg-neutral-200 text-neutral-600'}"
        on:click={() => changeCategory('')}
    >
        Tout
    </button>
    {#each $categories as category}
        <button
            class="relative px-4 py-2 rounded text-sm {currentCategory === category
                ? 'bg-primary-600 text-neutral-50'
                : 'bg-neutral-200 text-neutral-600'}"
            on:click={() => changeCategory(category)}
        >
            {category}
        </button>
    {/each}
</div>
