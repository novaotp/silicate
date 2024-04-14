<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import type { PageContext } from './utils';

    const { categories } = getContext<PageContext>("page");

    $: undecodedCurrentCategory = $page.url.searchParams.get('category');
    $: currentCategory = undecodedCurrentCategory !== null ? decodeURI(undecodedCurrentCategory) : '';

    const changeCategory = (newCategory: string) => {
        const searchParams = new URLSearchParams($page.url.searchParams);

        if (newCategory === '') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', encodeURI(newCategory));
        }

        goto(`/app/tasks?${searchParams}`, { invalidateAll: true });
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
            class="relative px-4 py-2 rounded text-sm {currentCategory === category ? 'bg-primary-600 text-neutral-50' : 'bg-neutral-200 text-neutral-600'}"
            on:click={() => changeCategory(category)}
        >
            {category}
        </button>
    {/each}
</div>
