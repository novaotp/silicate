<script lang="ts">
    import { page } from '$app/stores';
	import { Search } from '$ui/forms';
    import { changeSearchParams } from '$utils/change-search-params';

    $: undecodedCurrentSearch = $page.url.searchParams.get('search');
    $: currentSearch = undecodedCurrentSearch !== null ? decodeURI(undecodedCurrentSearch) : '';

    const search = (event: CustomEvent<string>) => {
        changeSearchParams('search', event.detail, { invalidateAll: true });
    };

    const reset = () => {
        changeSearchParams('search', null);
    }
</script>

<Search
    bind:value={currentSearch}
    placeholder="Recherche un mémo..."
    on:search={search}
    on:reset={reset}
/>
