<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import { fly } from 'svelte/transition';
    import Selection from './Selection.svelte';
    import Order from './Order.svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import type { PageContext } from '../types';

    const { selected, tasks, statuses, priorities } = getContext<PageContext>('page');
    export let show: boolean;

    const dispatch = createEventDispatcher();

    let search = $page.url.searchParams.get('search') ?? '';
    let order = $page.url.searchParams.get('order') ?? 'due-asc';
    let category = $page.url.searchParams.get('category') ?? 'All';

    /** Re-fetches the tasks with the given options. */
    const update = async () => {
        dispatch('close');

        const searchParams = $page.url.searchParams;
        searchParams.set('search', search);
        searchParams.set('order', order);
        searchParams.set('category', category);
        searchParams.set('status', selected.statuses.join(','));
        searchParams.set('priority', selected.priorities.join(','));
        await goto(`/app/tasks?${searchParams}`);

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks?${searchParams}`);
        const { data }: ApiResponseWithData<Task[]> = await response.json();

        $tasks = data;
    };
</script>

{#if show}
    <div class="absolute flex flex-col w-[calc(100%-40px)] bg-white pb-5 z-40 gap-4" transition:fly={{ y: -50 }}>
        <input class="relative w-full px-5 h-10 rounded-lg bg-gray-200 text-gray-500 text-sm" bind:value={search} placeholder="Filtrer par nom..." />
        <Order bind:order />
        <div class="flex flex-col gap-2">
            <h2>Statut</h2>
            <Selection values={statuses} bind:selected={selected.statuses} color="#16a34a" />
        </div>
        <div class="flex flex-col gap-2">
            <h2>Priorité</h2>
            <Selection values={priorities} bind:selected={selected.priorities} color="#dc2626" />
        </div>
        <button on:click={update} class="relative w-full h-10 bg-blue-500 rounded-lg text-white">Filtrer</button>
    </div>
{/if}
