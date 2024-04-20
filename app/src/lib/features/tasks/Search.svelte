<script lang="ts">
    import { getTasks } from "$/lib/requests/tasks";
    import { addToast } from "$/lib/stores/toast";
    import { IconCircleXFilled, IconSearch } from "@tabler/icons-svelte";
    import { getContext } from "svelte";
    import { push, querystring } from "svelte-spa-router";
    import type { PageContext } from "./utils";

    const { tasks } = getContext<PageContext>("page");

    $: urlSearchParams = new URLSearchParams($querystring);
    $: category = urlSearchParams.get('category') ?? '';
    $: searchParam = urlSearchParams.get('search') ?? '';
    $: archived = urlSearchParams.get('tab') === 'archives';

    const search = async () => {
        if (currentSearch === '') {
            urlSearchParams.delete('search');
        } else {
            urlSearchParams.set('search', encodeURI(currentSearch));
        }

        const updatedTaskResults = await getTasks(category, currentSearch, archived);

        if (!updatedTaskResults.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTaskResults.data;

        push(`/app/tasks?${urlSearchParams}`);
    }

    $: undecodedCurrentSearch = urlSearchParams.get('search');
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
