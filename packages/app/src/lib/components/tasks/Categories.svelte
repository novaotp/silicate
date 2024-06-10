<script lang="ts">
    import { getContext } from 'svelte';
    import type { PageContext } from './utils';
    import { push, querystring } from "svelte-spa-router";
    import { getTasks } from '$/lib/requests/tasks';
    import { addToast } from '$/lib/stores/toast';

    const { tasks, categories } = getContext<PageContext>("page");

    $: urlSearchParams = new URLSearchParams($querystring);
    $: search = urlSearchParams.get('search') ?? '';
    $: archived = urlSearchParams.get('tab') === 'archives';
    $: undecodedCurrentCategory = urlSearchParams.get('category');
    $: currentCategory = undecodedCurrentCategory !== null ? decodeURI(undecodedCurrentCategory) : '';

    const changeCategory = async (newCategory: string) => {
        if (newCategory === '') {
            urlSearchParams.delete('category');
        } else {
            urlSearchParams.set('category', encodeURI(newCategory));
        }

        const updatedTaskResults = await getTasks(newCategory, search, archived);

        if (!updatedTaskResults.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTaskResults.data;

        push(`/app/tasks?${urlSearchParams}`);
    };
</script>

<div role="list" class="relative min-h-10 w-full flex flex-nowrap items-center gap-2 overflow-x-auto">
    <button
        class="relative px-4 py-2 rounded text-sm {currentCategory === '' ? 'bg-primary-600 text-neutral-50' : 'bg-neutral-200 text-neutral-600'}"
        on:click={async () => await changeCategory('')}
    >
        Tout
    </button>
    {#each $categories as category}
        <button
            class="relative px-4 py-2 rounded text-sm {currentCategory === category ? 'bg-primary-600 text-neutral-50' : 'bg-neutral-200 text-neutral-600'}"
            on:click={async () => await changeCategory(category)}
        >
            {category}
        </button>
    {/each}
</div>
